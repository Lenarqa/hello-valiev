import { IParticipant } from "../models/models";

export const Participants: IParticipant[] = [
  {
    id: (Math.random() * 1e8).toString(), //random id
    name: "Буба Бубенцов",
    imgUrl: "buba.png",
    aboutMe: "Люблю пепперони и старые серии смешариков. А вы были на Таити?",
    status: "studies",
  },
  {
    id: (Math.random() * 1e8).toString(), //random id
    name: "Илья Анташкевич",
    imgUrl: "defaultImg.png",
    aboutMe: "Художник и иллюстратор. Рисую обаятельные и точные портреты из окружающей жизни.",
    status: "expelled",
  },
  {
    id: (Math.random() * 1e8).toString(), //random id
    name: "Леброн Джеймс",
    imgUrl: "lebron.png",
    aboutMe: "Звуковой художник, куратор и музыкальный продюсер. Работал как аранжировщик и композитор с популярными исполнителями.",
    status: "graduated",
  },
  {
    id: (Math.random() * 1e8).toString(), //random id
    name: "Натали Трамп",
    imgUrl: "defaultImg.png",
    aboutMe: "Изучаю цифровой дизайн, программирование и управление проектами.",
    status: "studies",
  },
  {
    id: (Math.random() * 1e8).toString(), //random id
    name: "Валентина Матанина",
    imgUrl: "valentina.png",
    aboutMe: "Звуковой художник, куратор и музыкальный продюсер. Работал как аранжировщик и композитор с популярными исполнителями.",
    status: "graduated",
  },
  {
    id: (Math.random() * 1e8).toString(), //random id
    name: "Лев Кошкин",
    imgUrl: "lev.png",
    aboutMe: "Звуковой художник, куратор и музыкальный продюсер. Работал как аранжировщик и композитор с популярными исполнителями.",
    status: "expelled",
  },
];
