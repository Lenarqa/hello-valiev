import { DummyOptionsCity } from "./../data/OptionsCity";
import { IMyInfo } from "./../models/models";

export const serializeUser = (infoObj: any) => {
  console.log(infoObj);
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

  console.log(infoObj.cityOfResidence);
  // city
  let city: number | string = 0; //1 - томск дефолт
  for (let i = 0; i < DummyOptionsCity.length; i++) {
    if (infoObj.cityOfResidence === translit(DummyOptionsCity[i].value)) {
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

  console.log(userItem);

  return userItem;
};

function translit(str: string) {
  let ru =
    "А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я".split(
      "-"
    );
  let en =
    "A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya".split(
      "-"
    );
  let res = "";
  for (let i = 0, l = str.length; i < l; i++) {
    let s = str.charAt(i),
      n = ru.indexOf(s);
    if (n >= 0) {
      res += en[n];
    } else {
      res += s;
    }
  }
  return res;
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
