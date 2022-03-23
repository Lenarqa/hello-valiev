import React from "react";
import styled from "styled-components";
import { ReactComponent as Telegram } from "../../assets/icons/telegram.svg";
import { ReactComponent as Vk } from "../../assets/icons/vk.svg";
import { ReactComponent as Reddit } from "../../assets/icons/reddit.svg";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #f5f5f5;
  padding: 20px 80px;
`;

const Text = styled.div`
  font-family: "Gilroy", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #8a8a8a;
`;

const IconA = styled.a`
  width: 20px;
  height: 20px;
  margin-right: 21px;
  /* transition: all 1s ease; */

  svg path{
    transition: all 0.5s ease;
  }

  svg:hover path {
    fill: rgba(121, 125, 223, 1);
  }
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <Text>© iLINK ACADEMY. ALL RIGHTS RESERVED. 2022</Text>
      <div>
        <IconA href="https://vk.com/lenarqaa" target="_blank">
          <Vk />
        </IconA>
        <IconA href="https://www.reddit.com/" target="_blank">
          <Reddit />
        </IconA>
        <IconA href="https://t.me/Lenarqa" target="_blank">
          <Telegram />
        </IconA>
      </div>
    </StyledFooter>
  );
};
export default Footer;
