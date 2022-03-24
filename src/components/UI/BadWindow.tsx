import React from "react";
import styled from "styled-components";
import { ReactComponent as Bad } from "../../assets/icons/bad.svg";
import { ReactComponent as Close } from "../../assets/icons/close2.svg";
import { ReactComponent as RedBubbles } from "../../assets/img/redBubbles.svg";

const StyledGoodWindow = styled.div`
  position: absolute;
  right: 40px;
  bottom: -40px;
  width: 438px;
  height: 132px;
  background: #F64B3C;
  border-radius: 32px;
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
`;

const Title = styled.div`
  font-family: "Factor A";
  font-weight: 500;
  font-size: 32px;
  color: #fff;
`;

const Text = styled.div`
  font-family: "Gilroy-Regular";
  font-weight: 400;
  font-size: 14px;
  color: #fff;
`;

interface IBadWindow {
    setShowBadWindow: (value: boolean) => void;
}

const BadWindow: React.FC <IBadWindow>= ({setShowBadWindow}) => {
  return (
    <StyledGoodWindow>
      <Wrapper>
        <Icon>
          <Bad />
        </Icon>
        <RedBubbles
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            overflow: "hidden",
            borderRadius: "0 0 0 32px",
          }}
        />
        <Info>
          <Title>Что-то не так...</Title>
          <Text>Не получилось отправить отзыв. Попробуйте еще раз!</Text>
        </Info>
        <Close
          style={{
            cursor: "pointer",
            position: "absolute",
            top: 24,
            right: 24,
          }}
          onClick={()=>{
            setShowBadWindow(false);
          }}
        />
      </Wrapper>
    </StyledGoodWindow>
  );
};

export default BadWindow;