import React from "react";
import styled from "styled-components";
import { ReactComponent as File } from "../../assets/icons/file.svg";
import LoadingIndicator from "../Slider/Loading/LoadingIndicator";

const StyledFileItem = styled.div`
  width: 265px;
  height: 56px;
  background: #f5f5f5;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 12px;
  margin-top: 12px;
`;

const FileContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-family: "Gilroy-Regular";
  color: #333333;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
`;
const LoadingBar = styled.div`
    width: 80%;
    border: 4px solid #C2C4FF;
`

const FileItem: React.FC = () => {
  return (
    <StyledFileItem>
      <File />
      <FileContent>
        <Title>Photo</Title>
        <LoadingBar />
      </FileContent>
      <LoadingIndicator />
    </StyledFileItem>
  );
};
export default FileItem;
