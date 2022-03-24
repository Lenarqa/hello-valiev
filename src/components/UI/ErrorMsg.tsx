import React from "react";
import styled from "styled-components";
import { ReactComponent as ErrorIcon } from "../../assets/icons/error.svg";

const Error = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 78px;
  height: 22px;
  margin-top: 2px;
`;

const Text = styled.div`
  font-family: "Gilroy-Regular";
  color: #EB5757;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
`;

const ErrorMsg: React.FC = (props) => {
  return (
    <Error>
      <ErrorIcon style={{ marginRight: 4 }} />
      <Text>{props.children}</Text>
    </Error>
  );
};
export default ErrorMsg;
