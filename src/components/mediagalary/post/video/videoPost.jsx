import React from "react";
import Topbar from "../../../library/Topbar";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Flex } from "../../../Utlis";
import UseInput from "../../../../hooks/useInput";
import { addElement } from "../../../../config/videoGalery";
import LangBox from "../../../library/LangBox";
import { Outlet } from "react-router-dom";
const Content = styled(Flex)`
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;
const Box = styled(Flex)`
  flex-direction: column;
  gap: 27px;
  padding-left: 38px;
  padding-right: 91px;
  width: 100%;
`;
const VideoPost = () => {
  return (
    <Content>
      <Topbar text1={"| Mediagalareya"} />
      <Box>
        <LangBox />
        <Outlet />
      </Box>
    </Content>
  );
};

export default VideoPost;