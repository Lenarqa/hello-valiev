import React from "react";
import styled from "styled-components";
import { ReactComponent as Success } from "../../assets/icons/success.svg";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { ReactComponent as GreenBubbles } from "../../assets/img/greenBubbles.svg";

const StyledGoodWindow = styled.div`
  position: fixed;
  right: 40px;
  bottom: 10px;
  width: 438px;
  height: 132px;
  background: #b5ffa2;
  border-radius: 32px;

  @media (max-width: 321px) {
    position: fixed;
    width: 288px;
    bottom: 12px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  position: absolute;
  left: 24px;
  top: -42px;
  z-index: 10;
`;
const Info = styled.div`
  width: 244px;
  height: 92px;
  margin-left: 130px;

  @media (max-width: 321px) {
    margin-left: 90px;
  }
`;

const Title = styled.div`
  font-family: "Factor A";
  font-weight: 500;
  font-size: 32px;
  color: #333333;

  @media (max-width: 321px) {
    font-size: 24px;
  }
`;

const Text = styled.div`
  font-family: "Gilroy-Regular";
  font-weight: 400;
  font-size: 14px;
  color: #333333;
`;

interface IGoogWindow {
    setShowGoodWindow: (value: boolean) => void;
}

const GoodWindow: React.FC <IGoogWindow>= ({setShowGoodWindow}) => {
  return (
    <StyledGoodWindow>
      <Wrapper>
        <Icon>
          <Success />
        </Icon>
        <GreenBubbles
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            overflow: "hidden",
            borderRadius: "0 0 0 32px",
          }}
        />
        <Info>
          <Title>Успешно!</Title>
          <Text>{`Спасибо за отзыв о нашей компании :)`}</Text>
        </Info>
        <Close
          style={{
            cursor: "pointer",
            position: "absolute",
            top: 24,
            right: 24,
          }}
          onClick={()=>{
            setShowGoodWindow(false);
          }}
        />
      </Wrapper>
    </StyledGoodWindow>
  );
};

export default GoodWindow;
