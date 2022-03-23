import React from "react";
import styled from "styled-components";
import "./LoadingIndicator.css";
const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 17px;
  height: 18px;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 12px;
    height: 12px;
    margin: 1px;
    border: 1px solid #585cc6;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #585cc6 transparent transparent transparent;
  }

  & div:nth-child(1) {
    animation-delay: -0.45s;
  }

  & div:nth-child(2) {
    animation-delay: -0.3s;
  }

  & div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingIndicator: React.FC = () => (
  <div className="sk-chase">
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
  </div>
);

export default LoadingIndicator;
