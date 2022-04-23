import { IValidationResult } from "./../../models/models";

export const nameValidation = (newValue: string): IValidationResult => {
  const res: IValidationResult = {
    result: false,
    errorMsg: "",
  };

  if (newValue.trim().length === 0) {
    res.result = true;
    res.errorMsg = "Поле обязатльльно для заполнения";
    return res;
  }

  if (/[^a-zA-Za-яA-Я]/.test(newValue)) {
    res.result = true;
    res.errorMsg = "Имя может содержать только кириллицу или латиницу";
    return res;
  }

  return res;
};

export const lastNameValidation = (newValue: string): IValidationResult => {
  const res: IValidationResult = {
    result: false,
    errorMsg: "",
  };

  if (newValue.trim().length === 0) {
    res.result = true;
    res.errorMsg = "Поле обязатльльно для заполнения";
    return res;
  }

  if (/[^a-zA-Za-яA-Я]/.test(newValue)) {
    res.result = true;
    res.errorMsg = "Фамилия может содержать только кириллицу или латиницу";
    return res;
  }

  return res;
};

export const smallAboutMeValidation = (newValue: string): IValidationResult => {
  const res: IValidationResult = {
    result: false,
    errorMsg: "",
  };

  if (newValue.trim().length <= 0) {
    res.result = true;
    res.errorMsg = "Поле не может быть пустым";
    return res;
  } 
  if (newValue.length >= 100) {
    res.result = true;
    res.errorMsg = "Достигнуто максимальное число символов (100)";
    return res;
  }
  return res;
};

export const bigAboutMeValidation = (newValue: string): IValidationResult => {
  const res: IValidationResult = {
    result: false,
    errorMsg: "",
  };

  if (newValue.trim().length <= 0) {
    res.result = true;
    res.errorMsg = "Поле не может быть пустым";
    return res;
  }

  if (newValue.length >= 299) {
    res.result = true;
    res.errorMsg = "Достигнуто максимальное число символов (300)";
  }

  return res;
};
