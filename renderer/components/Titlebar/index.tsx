import React from "react";
import { ipcRenderer as ipc } from "electron";

import TitlebarStyled from "./assets/titlebar";

const Titlebar = (): JSX.Element => {
  const onClose = () => {
    ipc.send("process:close");
  };

  const onMin = () => {
    ipc.send("process:min");
  };

  const onMax = () => {
    ipc.send("process:minmax");
  };

  return (
    <TitlebarStyled>
      <div className="buttons">
        <button id="close" className="tbbtn" onClick={() => onClose()} />
        <button id="minmax" className="tbbtn" onClick={() => onMin()} />
        <button id="max" className="tbbtn" onClick={() => onMax()} />
      </div>
    </TitlebarStyled>
  );
};

export default Titlebar;
