import React from "react";
import style from "./Pagination.module.css";

interface IPagination {
  curPage: number;
  participantPerPage: number;
  totalParticipant: number;
  changePageHandler: (pageNum: number) => void;
  nextPageHandler: () => void;
  backPageHandler: () => void;
}

const Pagination: React.FC<IPagination> = (props) => {
  const pageNumbers: number[] = [];
  const countOfPage = Math.ceil(
    props.totalParticipant / props.participantPerPage
  );
  
  for (let i = 1; i <= countOfPage; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <ul className={style.pagination}>
      <li
        key="back"
        className={style.back}
        onClick={props.backPageHandler}
        data-is-disable={props.curPage === 1}
      />
      {pageNumbers.map((pageNum, index) => (
        <li
          key={index}
          className={style.pageItem}
          onClick={props.changePageHandler.bind(this, pageNum)}
          data-active={pageNum === props.curPage}
        >
          {pageNum}
        </li>
      ))}
      <li
        key="next"
        className={style.next}
        onClick={props.nextPageHandler}
        data-is-disable={props.curPage === countOfPage}
      />
    </ul>
  );
};
export default Pagination;
