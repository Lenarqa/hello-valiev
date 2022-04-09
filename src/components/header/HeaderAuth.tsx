import React from "react";
import styled from "styled-components";
import ILinkLogo from "../../assets/img/iLink.svg";
import AcademyLogo from "../../assets/img/academy.svg";

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

const Logo = styled.img``;

const HeaderAuth: React.FC = () => {
  return (
    <StyledHeader>
      <LogoWrapper>
        <Logo src={ILinkLogo} alt="ILink-logo" />
        <Logo src={AcademyLogo} alt="Academy-logo" />
      </LogoWrapper>
    </StyledHeader>
  );
};
export default HeaderAuth;
