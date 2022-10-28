import React, { useState, useEffect } from "react";
import { ipcRenderer } from "electron";
import Swagger from "swagger-ui";
import axios, { AxiosResponse } from "axios";
import { isEmpty } from "lodash";

import Titlebar from "@components/Titlebar";

type Credentials = {
  address?: string;
  port?: number;
  username?: string;
  password?: string;
  protocol?: string;
};
type SwaggerUIPlugged = Swagger & {
  updateSpec: (specUpdates: any) => void;
};

const BASIC_AUTH = "BasicAuth";

const Home: React.FC = () => {
  const [swagger, SetSwagger] = useState<any>({});
  const [credentials, SetCredentials] = useState<Credentials>({});
  const [spec, SetSpec] = useState<any>({});

  // Get spec.
  useEffect(() => {
    if (!isEmpty(spec)) {
      console.log("spec is not empty returning");
      return;
    }
    console.warn("spec is empty fetching");
    axios
      .get("https://www.mingweisamuel.com/lcu-schema/lcu/openapi.json")
      .then((res: AxiosResponse<any>) => SetSpec(res.data));
  }, []);

  // Setup credentials listener.
  useEffect(() => {
    ipcRenderer.on("credentialspass", (_event, newCredentials) => {
      console.log(`FE received credentials: ${JSON.stringify(newCredentials)}`);
      if (isEmpty(credentials)) {
        SetCredentials(newCredentials);
      }
    });
    ipcRenderer.send("fe-ready");
  }, []);

  // Setup Swagger UI.
  useEffect(() => {
    const swaggerInst = Swagger({
      syntaxHighlight: false,
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
      defaultModelExpandDepth: 10,
      maxDisplayedTags: 100,
      tryItOutEnabled: true,
      displayRequestDuration: true,
      pluginsOptions: {
        pluginLoadType: "chain",
      },
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
                  // const jsonSpec = system.getState().toJSON().spec.json;
                  console.log("rerendering");
                  return true;
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
        if (isEmpty(swagger)) {
          console.log("swagger is empty applying instance");
          SetSwagger(swaggerInst);
        } else {
          console.log("swagger instance is present");
        }
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
      if (isEmpty(swagger)) {
        console.log("swager is empty and credentials arent null");
        return;
      }
      console.log("updating spec...");
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
      if (isEmpty(swagger)) {
        return;
      }
      console.log("updating spec");
      swagger.updateSpec({
        servers: [],
      });
    }

    // Update OpenAPI spec lcu-schema.
    if (spec != null) {
      console.log("updating spec");
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
