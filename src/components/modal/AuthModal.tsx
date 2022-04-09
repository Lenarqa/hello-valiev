import React from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 628px;
  height: 436px;
  border-radius: 2px;
  background-color: #fff;
  padding: 40px 40px 24px 40px;
  margin-bottom: 444px;
`;

const Title = styled.h2``;

const FormItem = styled.div``;

const Label = styled.label``;

const Input = styled.input``;

const Button = styled.button``;

const AuthModal: React.FC = () => {
  return (
    <Form>
      <Title>Войти</Title>
      <FormItem>
        <Label>Логин</Label>
        <Input />
      </FormItem>
      <FormItem>
        <Label>Пароль</Label>
        <Input />
      </FormItem>
      <Button />
      <div>Забыли пароль?</div>
    </Form>
  );
};
export default AuthModal;
