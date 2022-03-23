import React from "react";
import styled from "styled-components";
import { ReactComponent as File } from "../../assets/icons/file.svg";
import LoadingIndicator from "../Slider/Loading/LoadingIndicator";
import ProgressBar from "../Slider/ProgressBar";

const StyledFileItem = styled.div`
  width: 265px;
  height: 56px;
  background: #f5f5f5;
  border-radius: 2px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 14px 12px;
  margin-top: 12px;
`;

const FileContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 168px;
  margin-right: 16px;
`;

const Title = styled.div`
  font-family: "Gilroy-Regular";
  color: #333333;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: -6px;
`;
const LoadingBar = styled.div`
    width: 80%;
    border: 4px solid #C2C4FF;
`

const FileItem: React.FC = () => {
  return (
    <StyledFileItem>
      <File style={{marginRight:13}}/>
      <FileContent>
        <Title>Photo</Title>
        <ProgressBar />
      </FileContent>
      <LoadingIndicator />
    </StyledFileItem>
  );
};
export default FileItem;
