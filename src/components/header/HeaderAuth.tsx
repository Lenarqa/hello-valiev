import React from "react";
import styled from "styled-components";
import { ReactComponent as ILinkLogo } from "../../assets/img/iLink.svg";
import { ReactComponent as AcademyLogo } from "../../assets/img/academy.svg";

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  margin-bottom: 44px;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderAuth: React.FC = () => {
  return (
    <StyledHeader>
      <LogoWrapper>
        <ILinkLogo style={{marginBottom: 7}}/>
        <AcademyLogo/>
      </LogoWrapper>
    </StyledHeader>
  );
};
export default HeaderAuth;
