//libraries
import React, { useState } from 'react';
//styles
import './Pagination.scss';

const Pagination = ({ setIndexesCallBack, indexes, sortSearchUsers, setSearchValueCallBack }) => {
  const [pages, setPages] = useState([1, 2, 3]);

  const getNextPage = () => {
    if (!sortSearchUsers.length) return;
    setIndexesCallBack({ start: indexes.start + 20, end: indexes.end + 20 })
    const nextPage = pages.map(el => el + 1);
    setPages(nextPage);
    setSearchValueCallBack('')
  }

  const getPrevPage = () => {
    if (indexes.start <= 2 || sortSearchUsers.length < 10 && sortSearchUsers.length !== 0) return;
    setIndexesCallBack({ start: indexes.start - 20, end: indexes.end - 20 })
    const prevPage = pages.map(el => el - 1);
    setPages(prevPage);
    setSearchValueCallBack('')
  }

  const showCurrentPage = (e) => {
    const currentNum = Number(e.target.innerText);
    setIndexesCallBack({ start: (currentNum * 20) - 20, end: currentNum * 20 });
  }

  return (
    <div className="pagination__container">
      <button
        type="button"
        className="pagination__button prev"
        onClick={getPrevPage}
      >
        Previous
      </button>
      {pages.map((page, i) => (
        <button
          key={(page + i)}
          type="button"
          className={i === 0 ? "pagination__button active" : "pagination__button"}
          onClick={showCurrentPage}
        >
          {page}
        </button>
      )
      )}
      <button
        type="button"
        className="pagination__button next"
        onClick={getNextPage}
      >
        Next
      </button>
    </div>
  )
}
export default Pagination;