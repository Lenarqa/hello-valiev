import React from "react";
import style from "./MyCard.module.css";
import man from "../../../assets/icons/man.svg";
import animal from "../../../assets/icons/animal.svg";

const MyCard: React.FC = () => {
  return (
    <div className={style.card}>
      <div className={style.header}>
        <p>Ленар Валиев</p>
        <p>25.11.1998</p>
      </div>
      <div className={style.info}>
        <div className={style.infoItem}>
          <p className={style.title}>Город:</p>
          <p className={style.text}>Томск</p>
        </div>
        <div className={style.infoItem}>
          <p className={style.title}>Пол:</p>
          <p className={style.text}>Мужской</p>
          <img src={man} />
        </div>
        <div className={style.infoItem}>
          <p className={style.title}>Возраст:</p>
          <p className={style.text}>23</p>
        </div>
      </div>
      <div className={style.aboutMeInfo}>
        <div className={style.aboutMeText}>
          <b>О себе:</b> Hello everybody! Меня зовут Ленар, мне 23 года, я
          студент ТУСУРа. Учусь на программиста-экономиста на 1 курсе
          магистратуры. За время бакалавариата, я успел попробовать себя во
          многих областях программирования и не только. Попробовал себя в роли
          бухгалтера, помошника метролога, инженера-программиста и т.д. И в
          итоге я пришел к frontend разработке, и хотя сначала я относился к
          этому скептически, попробовав, я понял, что да, это то в чем бы я
          хотел заниматься, разработка интерфейсов, логика пользовательского
          взаимодействие, движение данных внутри сайта и анимация, все это меня
          очень привлекло.
        </div>
      </div>
      <div>
        <div className={style.footer}>
          <img src={animal} style={{ marginRight: 12 }} />
          <div className={style.aboutMeText}>
            <b>Домашних животных:</b> нет
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyCard;
