import style from "./Carusel.module.css";
interface ICarusel {
  offset: number;
}

const Carusel: React.FC<ICarusel> = ({ children, offset }) => {
  return (
    <div className={style.mainContainer}>
      <div className={style.window}>
        <div
          className={style.allPagesContainer}
          style={{ transform: `translateX(${offset}px)` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Carusel;
