import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface IWrapper {
  isBigFile: boolean;
}

const Wrapper = styled.div<IWrapper>`
  progress {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #eee;
  }
  progress[value] {
    border-radius: 8px;
    border: 0;
    height: 4px;
    overflow: hidden;
    background: #eee;
    width: 168px;
  }

  progress::-moz-progress-bar {
    background: ${({ isBigFile }) => (isBigFile ? "#EB5757" : "#585cc6")};
    border-radius: 8px;
  }

  progress[value]::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 2px;
  }

  progress[value]::-webkit-progress-value {
    background-color: ${({ isBigFile }) => (isBigFile ? "#EB5757" : "#585cc6")};
    border-radius: 2px;
  }
`;

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
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    }
  }, [value, isLoading, setIsLoading]);

  return (
    <Wrapper isBigFile={isBigFile}>
      <progress value={value} max={100} />
    </Wrapper>
  );
};
export default ProgressBar;
