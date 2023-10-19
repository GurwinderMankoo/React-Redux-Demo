import React from "react";
import Style from "./Pagination.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  next: () => void;
  prev: () => void;
};

const Pagination = ({ currentPage, totalPages, next, prev }: Props) => {
  return (
    <div className={Style.pagination}>
      <button
        className={`${Style.btn} ${Style.prev} ${
          currentPage === 1 ? Style.disabled : ""
        }
      `}
        onClick={prev}
      >
        {"<<"} Prev
      </button>
      <button
        className={`${Style.btn} ${Style.next} ${
          currentPage === totalPages ? Style.disabled : ""
        }
      `}
        onClick={next}
      >
        Next {">>"}
      </button>
    </div>
  );
};

export default Pagination;
