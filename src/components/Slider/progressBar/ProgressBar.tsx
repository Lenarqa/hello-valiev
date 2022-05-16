import React, { useEffect, useState } from "react";
import style from "./ProgressBar.module.css";

interface IProgressBar {
  isBigFile: boolean;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const ProgressBar: React.FC<IProgressBar> = ({
  isBigFile,
  isLoading,
  setIsLoading,
}) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      interval = setInterval(() => {
        setValue((prev) => {
          const newValue = prev + 10;
          return newValue;
        });
        if (value === 100) {
          setIsLoading(false);
        }
      }, 250);
    }
    return () => {
      clearInterval(interval);
    }
  }, [value, isLoading, setIsLoading]);

  return (
    <div className={style.wrapper} data-is-big={isBigFile}>
      <progress value={value} max={100} />
    </div>
  );
};
export default ProgressBar;
