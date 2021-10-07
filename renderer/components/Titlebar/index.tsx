import React from "react";

import TitlebarStyled from "./assets/titlebar";

const Titlebar = (props: any) => {
  return (
    <TitlebarStyled>
      <div className="buttons">
        <button id="close" className="tbbtn" />
        <button id="minmax" className="tbbtn" />
        <button id="max" className="tbbtn" />
      </div>
    </TitlebarStyled>
  );
};

export default Titlebar;
