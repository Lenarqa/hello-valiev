import React from "react";
import style from "./ControlPanelAboutMe.module.css";
import { ReactComponent as PencilIcon } from "../../assets/icons/pencil.svg";
import Button from "../../components/UI/button/Button";
import Input from "../../components/UI/input/Input";

const ControlPanelAboutMe: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.contentHeader}>
          <h2>Обо мне</h2>
        </div>
        <form className={style.aboutMe}>
            <div className={style.headerForm}>
                <div className={style.imgSection}>
                    <img src={require("../../assets/img/photo.jpg")} alt="photo" />
                    <div className={style.changePhoto}>
                        <p>Фото профиля</p>
                        <div className={style.headerAction}>
                            <PencilIcon />
                            <div>Изменить фото</div>
                        </div>
                    </div>
                </div>
                <Button  type="submitAboutMe">Редактировать</Button>
            </div>
            <div className={style.inputsSection}>
                <div className={style.row}>
                    {/* <Input /> */}
                </div>
            </div>
        </form>
      </div>
    </div>
  );
};
export default ControlPanelAboutMe;
