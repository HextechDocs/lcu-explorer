import React from "react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import "css-reset-and-normalize/css/button-reset.min.css";
import "css-reset-and-normalize/css/link-reset.min.css";
import "css-reset-and-normalize/css/reset-and-normalize.min.css";

import "swagger-ui/dist/swagger-ui.css";
import "../styles/globals.sass";

const LCUExplorer = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default LCUExplorer;
