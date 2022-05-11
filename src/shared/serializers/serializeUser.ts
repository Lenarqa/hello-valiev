import { DummyOptionsCity } from "./../data/OptionsCity";
import { IMyInfo } from "./../models/models";

export const serializeUser = (infoObj: any) => {
  const birthday: Date = new Date(infoObj.birthDate);
  const userBirthday: string = `${birthday.getDate()}.${
    birthday.getMonth() + 1
  }.${birthday.getFullYear()}`;

  // smallAboutMe
  let smallAmoutMe: string = "";
  if (infoObj.smallAboutMe) {
    smallAmoutMe = infoObj.smallAboutMe;
  }

  // age
  const today: Date = new Date();
  let age: number = today.getFullYear() - birthday.getFullYear();
  let m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }

  // gender
  const gender: number = infoObj.gender === "male" ? 1 : 2;

  // pet
  const pet: number = infoObj.hasPet ? 1 : 2;

  // city
  let city: number | string = 0; //1 - томск дефолт
  for (let i = 0; i < DummyOptionsCity.length; i++) {
    if (infoObj.cityOfResidence === rusToTranslit(DummyOptionsCity[i].value)) {
      city = DummyOptionsCity[i].id;
      break;
    }
  }

  const userItem: IMyInfo = {
    id: infoObj.id,
    name: `${infoObj.firstName} ${infoObj.lastName}`,
    miniImgUrl: infoObj.profileImage,
    mainImgUrl: infoObj.profileImage,
    birthday: userBirthday,
    city: city as number,
    gender: gender,
    year: age,
    smallAboutMe: smallAmoutMe,
    aboutMeText: infoObj.aboutMe,
    pet: pet,
  };
  return userItem;
};

export const serializeUserPostRequest = (userInfo: any) => {
  const year = parseInt(userInfo.birthday.split(".")[2]);
  const mounth = parseInt(userInfo.birthday.split(".")[1]);
  const day = parseInt(userInfo.birthday.split(".")[0]);
  const birthday = new Date(year, mounth - 1, day);

  const city = DummyOptionsCity.find((item) => item.id === userInfo.city);
  let resCity: string = "";
  if (city) {
    resCity = rusToTranslit(city?.value);
  }

  const gender = userInfo.gender === 1 ? "male" : "female";
  const pet = userInfo.pet === 1 ? true : false;

  const paramsObj = {
    firstName: userInfo.name.split(" ")[1],
    lastName: userInfo.name.split(" ")[0],
    birthDate: birthday.toString(),
    cityOfResidence: resCity,
    gender: gender,
    hasPet: pet,
    smallAboutMe: userInfo.smallAboutMe,
    aboutMe: userInfo.aboutMeText,
  };
  return paramsObj;
} 

export function rusToTranslit(text: string, engToRus?: boolean) {
  const rus =
      "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(
        / +/g
      ),
    eng =
      "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(
        / +/g
      );

  let x;
  for (x = 0; x < rus.length; x++) {
    text = text
      .split(engToRus ? eng[x] : rus[x])
      .join(engToRus ? rus[x] : eng[x]);
    text = text
      .split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase())
      .join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
  }
  return text;
}
