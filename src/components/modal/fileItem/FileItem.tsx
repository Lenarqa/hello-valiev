import React from "react";
import style from "./FileItem.module.css";
import { ReactComponent as File } from "../../../assets/icons/file.svg";
import { ReactComponent as Delete } from "../../../assets/icons/delete.svg";
import LoadingIndicator from "../../Slider/myLoading/LoadingIndicator";
import ProgressBar from "../../Slider/progressBar/ProgressBar";

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
    <div className={style.styledFileItem}>
      <File className={style.fileIcon} />
      <div className={style.fileContent}>
        <div className={style.title} data-is-big={isBigFile}>
          {name}
        </div>
        <ProgressBar
          isBigFile={isBigFile}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Delete className={style.deleteIcon} onClick={deleteUserFile} />
      )}
    </div>
  );
};
export default FileItem;
