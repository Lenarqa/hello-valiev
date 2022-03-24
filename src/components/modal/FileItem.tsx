import React from "react";
import styled from "styled-components";
import { ReactComponent as File } from "../../assets/icons/file.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
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

interface ITitle {
  isBigFile: boolean;
}

const Title = styled.div<ITitle>`
  font-family: "Gilroy-Regular";
  color: ${({ isBigFile }) => (isBigFile ? "#EB5757" : "#333333")};
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: -6px;
`;

interface IFileItem {
  isBigFile: boolean;
  name: string | undefined;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  deleteUserFile: () => void;
}

const FileItem: React.FC<IFileItem> = ({
  isBigFile,
  name,
  isLoading,
  setIsLoading,
  deleteUserFile,
}) => {
  if (!name) {
    name = "Некорректное значение";
  }

  if (isBigFile) {
    name = "Your file is too big!";
  }

  return (
    <StyledFileItem>
      <File style={{ marginRight: 13 }} />
      <FileContent>
        <Title isBigFile={isBigFile}>{name}</Title>
        <ProgressBar isBigFile={isBigFile} isLoading={isLoading} setIsLoading={setIsLoading} />
      </FileContent>
      {isLoading ? (
        <LoadingIndicator/>
      ) : (
        <Delete style={{ cursor: "pointer" }} onClick={deleteUserFile} />
      )}
    </StyledFileItem>
  );
};
export default FileItem;
