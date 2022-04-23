import React from "react";
import style from "./LoadingSpiner.module.css";
interface ILoadingSpiner {
  type?:string;
}
const LoadingSpiner: React.FC<ILoadingSpiner> = (props) => {
  return (
    <div className={style.container} data-type={props.type}>
      <div className={style.box}>
        <div className={style.item1}></div>
        <div className={style.item2}></div>
        <div className={style.item3}></div>
        <div className={style.item4}></div>
      </div>
    </div>
  );
};
export default LoadingSpiner;
