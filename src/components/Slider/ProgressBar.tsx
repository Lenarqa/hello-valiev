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

const ProgressBar: React.FC = (props) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => {
        const newValue = prev + 10;
        if (newValue === 100) {
          clearInterval(interval);
        }
        return newValue;
      });
    }, 1000);
  }, []);

  return (
    <Wrapper>
      <progress value={value} max={100} />
    </Wrapper>
  );
};
export default ProgressBar;
