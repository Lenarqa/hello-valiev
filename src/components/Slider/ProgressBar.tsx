import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
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
    background: #585cc6;
    border-radius: 8px;
  }

  progress[value]::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 2px;
  }

  progress[value]::-webkit-progress-value {
    background-color: #585cc6;
    border-radius: 2px;
  }
  
`;

interface IProgressBar {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}

const ProgressBar: React.FC<IProgressBar> = ({isLoading, setIsLoading}) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
      if(isLoading) {
          const interval = setInterval(() => {
            setValue((prev) => {
              const newValue = prev + 10;
              if (newValue === 100) {
                clearInterval(interval);
                setIsLoading(false);
              }
              return newValue;
            });
          }, 1000);
      }
  }, [isLoading, setIsLoading]);

  return (
    <Wrapper>
      <progress value={value} max={100} />
    </Wrapper>
  );
};
export default ProgressBar;
