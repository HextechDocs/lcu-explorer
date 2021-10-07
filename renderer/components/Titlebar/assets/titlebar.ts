import styled from "styled-components";

const TitlebarStyled = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
  -webkit-app-region: drag;
  flex-direction: row;

  .buttons {
    margin: 0.3rem;
    -webkit-app-region: no-drag;
    button {
      width: 3vh;
      height: 100%;
      margin: 0 0.2rem;
      border-radius: 100%;
      -webkit-app-region: no-drag;
      transition-duration: 250ms;
      &:focus {
        border: none;
        outline: none;
      }
      &:hover {
        filter: grayscale(0.3);
        transition-duration: 250ms;
      }
    }

    #close {
      background-color: crimson;
    }

    #minmax {
      background-color: darkorange;
    }

    #max {
      background: mediumspringgreen;
    }
  }
`;

export default TitlebarStyled;
