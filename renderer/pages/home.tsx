import React, { useState, useEffect } from "react";
import { ipcRenderer } from "electron";
import Swagger from "swagger-ui";
import axios, { AxiosResponse } from "axios";

import Titlebar from "@components/Titlebar";

type Credentials = {
  address: string;
  port: number;
  username: string;
  password: string;
  protocol: string;
};
type SwaggerUIPlugged = Swagger & {
  updateSpec: (specUpdates: any) => void;
};

const BASIC_AUTH = "BasicAuth";

const Home = (): JSX.Element => {
  const [swagger, SetSwagger] = useState<SwaggerUIPlugged>();
  const [credentials, SetCredentials] = useState<Credentials>();
  const [spec, SetSpec] = useState<any>();

  // Get spec.
  useEffect(() => {
    axios
      .get("https://www.mingweisamuel.com/lcu-schema/lcu/openapi.json")
      .then((res: AxiosResponse<any>) => SetSpec(res.data));
  }, []);

  // Setup credentials listener.
  useEffect(() => {
    ipcRenderer.on("credentialspass", (_event, newCredentials) => {
      console.log(`FE received credentials: ${JSON.stringify(newCredentials)}`);
      SetCredentials(newCredentials);
    });
    ipcRenderer.send("fe-ready");
  }, []);

  // Setup Swagger UI.
  useEffect(() => {
    const swaggerInst = Swagger({
      dom_id: "#swagger",
      spec: {
        openapi: "3.0.0",
        security: [
          {
            [BASIC_AUTH]: [],
          },
        ],
        components: {
          securitySchemes: {
            [BASIC_AUTH]: {
              type: "http",
              scheme: "basic",
            },
          },
        },
        servers: [],
      },
      operationsSorter: "alpha",
      tagsSorter: "alpha",
      docExpansion: "none",
      defaultModelExpandDepth: 1,
      displayRequestDuration: true,
      filter: "",
      deepLinking: false, // @ts-ignore
      requestInterceptor: (request: any) => {
        request.curlOptions = ["--insecure"];
        return request;
      },
      plugins: [
        (system) => ({
          statePlugins: {
            spec: {
              wrapSelectors: {
                allowTryItOutFor: () => () => {
                  const jsonSpec = system.getState().toJSON().spec.json;
                  return jsonSpec.servers.length > 0;
                },
              },
            },
          },
          rootInjects: {
            updateSpec: (specUpdates: any) => {
              const jsonSpec = system.getState().toJSON().spec.json;
              const newJsonSpec = { ...jsonSpec, ...specUpdates };
              // Preserve securitySchemes.
              newJsonSpec.components.securitySchemes =
                jsonSpec.components.securitySchemes;
              return system.specActions.updateJsonSpec(newJsonSpec);
            },
          },
        }),
      ],
      onComplete: () => {
        console.log("Swagger UI loading complete.");
        SetSwagger(swaggerInst);
      },
    }) as SwaggerUIPlugged;
  }, []);

  useEffect(() => {
    console.log(
      `Updating FE: swagger ${swagger != null}, spec ${
        spec != null
      }, credentials ${JSON.stringify(credentials)}.`
    );

    // If Swagger UI not ready, nothing to update.
    if (swagger == null) {
      return;
    }

    // Update credentials/port from connector.
    if (credentials != null) {
      swagger.updateSpec({
        servers: [
          {
            url: `https://127.0.0.1:${credentials.port}`,
            description: "default",
          },
        ],
      });
      swagger.preauthorizeBasic(
        BASIC_AUTH,
        credentials.username,
        credentials.password
      );
    } else {
      swagger.updateSpec({
        servers: [],
      });
    }

    // Update OpenAPI spec lcu-schema.
    if (spec != null) {
      swagger.updateSpec(spec);
    }
  }, [swagger, credentials, spec]);

  return (
    <>
      <Titlebar />
      <div id="swagger" />
    </>
  );
};

export default Home;
