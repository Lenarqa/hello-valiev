import { EmailValidationRegEx } from "./regEx";

export const validateEmailReactHookForm = (newValue: string) => {
  if (newValue.trim().length === 0) {
    return "Поле не может быть пустым";
  }

  if (/,/.test(newValue)) {
    return"Email не может содержать в себе запятых";
  }

  if (!/^(?=[a-zA-Z0-9])/.test(newValue)) {
   return"Email не может начинаться с символа, только с числа или латинских букв, любого регистра";
  }

  if (
    (!newValue.includes("@") && newValue.length > 25) ||
    newValue.split("@")[0].length > 25
  ) {
    return "Количество символов до знака @ не может быть длиннее 25";
  }

  if (!newValue.includes("@") && newValue.length > 25) {
    return "Количество символов до знака @ не может быть длиннее 25 символов";
  }

  if (!/@/.test(newValue)) {
    return  "Email обязан содержать в себе символ @";
  }

  // text lenght after @ and before (.com/.ru) can`t be > 25
  if (
    (newValue.includes("@") &&
      newValue.split("@")[1].split(".")[0].length > 25) ||
    (newValue.includes("@") && newValue.split("@")[1].split(".")[0].length < 1)
  ) {
    return "Количество символов после знака @ не может быть больше 25 символов и меньше 1";
  }

  // Email need to include domain.
  if (
    (newValue.includes("@") &&
      newValue.split("@")[1].includes(".") &&
      (newValue.split("@")[1].split(".")[1].length < 2 ||
        newValue.split("@")[1].split(".")[1].length > 4)) ||
    (newValue.includes("@") && !newValue.split("@")[1].includes("."))
  ) {
   return "Email обязательно должен содержать домен (.ru/com и т.д). Домен не может быть короче 2 символов и длиннее 4";
  }

  //final check, check
  if (!EmailValidationRegEx.test(newValue)) {
    return "Email не может включать в себе кирилицу, используйте только латинский алфавит";
  }
};

export const validatePasswordReactHookForm = (newValue: string) => {
  

  if (newValue.trim().length === 0) {
    return "Поле не может быть пустым";
  }

  if (!/.*\d/.test(newValue)) {
   return "Пароль должен содержать цифры";
  }

  if (!/.*[a-z]/.test(newValue)) {
    return "Пароль должен содержать латинские буквы нижнего регистра";
  }

  if (!/.*[A-Z]/.test(newValue)) {
    return "Пароль должен содержать латинские буквы верхнего регистра";
  }

  if (!/.*\W/.test(newValue)) {
    return "Пароль должен содержать символы (например !№%:?)";
  }

  if (newValue.length < 8 || newValue.length > 24) {
    return "Пароль не может быть короче 8 символов и длиннее 24 символов";
  }

  // \W это аналог ([^a-zA-Z0-9_]) он позволяет вводить кириллицу
  // я не думаю что в пароле должна быть кириллица поэтому добавил проверку
  // если кириллица в пароле все таки имеет место быть я уберу эту проверку.
  if (/[а-яА-ЯёЁ]/.test(newValue)) {
    return "Пароль не может содержать кириллицу, используйте только латиницу";
  }
}
