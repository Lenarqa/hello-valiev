import React from "react";
import styled from "styled-components";
import ButtonAdd from "../UI/ButtonAdd";
import HeaderButton from "../UI/HeaderButton";
import { ReactComponent as Info } from "../../assets/icons/info.svg";

const StyledReviewModal = styled.div`
  position: absolute;
  width: 676px;
  height: 443px;
  background-color: #fff;
  padding: 24px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-family: "Factor A";
  font-weight: 500;
  font-size: 24px;
  color: #333333;
`;

const Btn = styled.button`
  border: none;
  width: 18px;
  height: 18px;
  background-color: red;
  position: relative;
  background-color: transparent;
  cursor: pointer;

  &:before {
    position: absolute;
    top: 0px;
    left: 50%;
    content: " ";
    height: 17px;
    width: 2px;
    background-color: #333;
    transform: rotate(45deg);
  }
  &:after {
    position: absolute;
    top: 0px;
    left: 50%;
    content: " ";
    height: 17px;
    width: 2px;
    background-color: #333;
    transform: rotate(-45deg);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Input = styled.input`
  font-family: "Gilroy-Regular";
  width: 395px;
  height: 52px;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  margin-right: 16px;
  padding: 15px 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #8a8a8a;
`;

const Textarea = styled.textarea`
  font-family: "Gilroy-Regular";
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  width: 628px;
  height: 105px;
  padding: 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #8a8a8a;
  resize: none;
`;

const Label = styled.p`
  font-family: "Factor A";
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 14px;
`;

const ActionText = styled.p`
  font-family: "Gilroy-Regular";
  color: #8a8a8a;
  font-weight: 400;
  font-size: 12px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin: 0 10px 0 18px;
  }
`;

interface IReviewModal {
  close: () => void;
}

const ReviewModal: React.FC<IReviewModal> = ({close}) => {
  return (
    <StyledReviewModal>
      <Header>
        <Title>Отзыв</Title>
        <Btn onClick={close}/>
      </Header>
      <Content>
        <Item>
          <div>
            <Label>Как вас зовут?</Label>
          </div>
          <div style={{ display: "flex" }}>
            <Input placeholder="Имя Фамилия" type="text" />
            <ButtonAdd onClick={() => {}}>Загрузить фото</ButtonAdd>
          </div>
        </Item>
        <Item>
          <Label>Все ли вам понравилось?</Label>
          <Textarea placeholder="Напишите пару слов о вашем опыте." />
        </Item>
      </Content>
      <Actions>
        <HeaderButton>Отправить отзыв</HeaderButton>
        <Info />
        <ActionText>Все отзывы проходят модерацию в течение 2 часов</ActionText>
      </Actions>
    </StyledReviewModal>
  );
};
export default ReviewModal;
