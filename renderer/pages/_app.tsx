import React from "react";
import { RecoilRoot } from "recoil";

import "css-reset-and-normalize/css/button-reset.min.css";
import "css-reset-and-normalize/css/link-reset.min.css";
import "css-reset-and-normalize/css/reset-and-normalize.min.css";

import "swagger-ui/dist/swagger-ui.css";

const LCUExplorer = ({ Component, pageProps }: never): JSX.Element => {
  return (
    <RecoilRoot>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default LCUExplorer;
