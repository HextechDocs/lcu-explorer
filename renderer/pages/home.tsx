import React, { useState, useEffect } from "react";
import { ipcRenderer } from "electron";
import Swagger from "swagger-ui";
import axios, { AxiosResponse } from "axios";

import Titlebar from "@components/Titlebar";

const BASIC_AUTH = "BasicAuth";

const Home = (): JSX.Element => {
  const [credentials, SetCredentials] = useState<{
    address: string;
    port: number;
    username: string;
    password: string;
    protocol: string;
  }>();

  useEffect(() => {
    ipcRenderer.send("fe-ready");

    ipcRenderer.on("credentialspass", (event, data) => {
      SetCredentials(data);
    });
  }, []);

  const swaggerPromise = axios.get(
    "https://www.mingweisamuel.com/lcu-schema/lcu/openapi.json"
  );

  useEffect(() => {
    if (credentials == null) {
      console.warn("Credentials are null.");
      return;
    }
    swaggerPromise.then((res: AxiosResponse<any>) => {
      const spec = res.data;

      spec.servers = [
        {
          url: `https://127.0.0.1:${credentials.port}`,
          description: "default",
        },
      ];

      spec.components = {
        securitySchemes: {
          [BASIC_AUTH]: {
            type: "http",
            scheme: "basic",
          },
        },
      };
      spec.security = [
        {
          [BASIC_AUTH]: [],
        },
      ];

      try {
        const swagger = Swagger({
          dom_id: "#swagger",
          spec,
          operationsSorter: "alpha",
          tagsSorter: "alpha",
          docExpansion: "none",
          defaultModelExpandDepth: 1,
          displayRequestDuration: true,
          filter: "",
          deepLinking: false, // @ts-ignore
          "request.curlOptions": ["--insecure"], // TODO: doesn't seem to show up.
        });
        swagger.preauthorizeBasic(
          BASIC_AUTH,
          credentials.username,
          credentials.password
        );
      } catch (e) {
        console.log("not ready to swagify");
        console.log(e);
      }
    });
  }, [credentials]);

  return (
    <>
      <Titlebar />
      <div id="swagger" />
    </>
  );
};

export default Home;
