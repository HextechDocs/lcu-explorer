import React, { useState, useEffect } from "react";
import { ipcRenderer } from "electron";
import Swagger from "swagger-ui";
import axios from "axios";
import { Agent } from "https";

import Titlebar from "@components/Titlebar";
import { btoa } from "buffer";

const reAgent = new Agent({
  rejectUnauthorized: false,
});

const Home = (): JSX.Element => {
  const [credentials, SetCredentials] = useState();
  useEffect(() => {
    ipcRenderer.send("fe-ready");

    ipcRenderer.on("credentialspass", (event, data) => {
      SetCredentials(data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://www.mingweisamuel.com/lcu-schema/lcu/openapi.json")
      .then((res) => {
        const spec = res.data;

        spec.servers = [
          {
            url: `https://127.0.0.1:${credentials?.port}`,
            description: "default",
          },
        ];

        spec.components = {
          securitySchemes: {
            BasicAuth: {
              type: "https",
              scheme: "basic",
            },
          },
        };

        // const basicAuth = [
        //   {
        //     Authorization: `Basic ${btoa(
        //       // @ts-ignore
        //       `${credentials.username}:${credentials.password}`
        //     )}`,
        //   },
        // ];
        //
        // spec.security = [basicAuth];

        try {
          Swagger({
            dom_id: "#swagger",
            spec,
            operationsSorter: "alpha",
            tagsSorter: "alpha",
            docExpansion: "none",
            defaultModelExpandDepth: 1,
            displayRequestDuration: true,
            filter: "",
            deepLinking: false, // @ts-ignore
            request: {
              curlOptions: [
                "--insecure",
                `-H "Authorization: ${btoa(
                  // @ts-ignore
                  `${credentials.username}:${credentials.password}`
                )}"`,
              ],
            },
          });
        } catch (e) {
          console.log("not ready to swagify");
          console.log(e);
        }
      });
  }, [credentials]);

  useEffect(() => {
    window.fetch = (inf, req) => {
      if (!credentials) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { url, method } = req;
      // eslint-disable-next-line consistent-return
      return axios
        .request({
          method: method || "get",
          url,
          httpsAgent: reAgent,
          withCredentials: true,
          responseType: "text",
          transformResponse: (res) => res,
          headers: {
            Authorization: `Basic ${btoa(
              // @ts-ignore
              `${credentials.username}:${credentials.password}`
            )}`,
          },
        })
        .then((res) => {
          console.log(`typeof res: ${typeof res}`);
          return new Response(res.data ? res.data : "", {
            headers: res.headers,
            status: res.status ? res.status : 200,
            statusText: res.statusText ? res.statusText : "k",
          });
        })
        .catch((error) => {
          console.error(error);
          console.error(`Credentials: ${JSON.stringify(credentials)}`);
          throw new Error(error);
        });
    };
  }, [credentials]);

  return (
    <>
      <Titlebar />
      <div id="swagger" />
    </>
  );
};

export default Home;
