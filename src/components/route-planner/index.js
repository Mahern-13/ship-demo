import React from "react";
import Logo from "../../assets/logo";
import Wrapper from "../wrapper";
import CreateStop from "./create-stop";
import StopsEditor from "./stops-editor";

const divStyling = {
  width: "85%",
  margin: "0px auto 20px"
};

const RoutePlanner = () => {
  return (
    <Wrapper styling={{ flexDirection: "column" }}>
      <Wrapper styling={divStyling}>
        <Logo />
        <CreateStop />
      </Wrapper>
      <Wrapper styling={divStyling}>
        <StopsEditor />
      </Wrapper>
    </Wrapper>
  );
};

export default RoutePlanner;
