import React, { useRef } from "react";
import "./styles/pagination.css";
import $ from "jquery";

const Pagination = ({ page, maxPage, setPage }) => {


    const windowRef = useRef(null);

    windowRef.current = window;

  const pagesPerBlock = 5;
  const currentBlock = Math.ceil(page / pagesPerBlock);
  const maxBlock = Math.ceil(maxPage / pagesPerBlock);

  const arrPage = [];
  const initialPage = (currentBlock - 1) * pagesPerBlock + 1;
  const finalPage =
    maxBlock === currentBlock ? maxPage : currentBlock * pagesPerBlock;
  for (let i = initialPage; i <= finalPage; i++) {
    arrPage.push(i);
  }

  const scroolSmooth = () => {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    windowRef.current.scrollTo(0, 0);
  }

  const handlePage = (e) => {
    setPage(Number(e.target.textContent));
    scroolSmooth()
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);

      scroolSmooth()
    }
  };

  const handleNext = () => {
    if (page < maxPage) {
      setPage(page + 1);
      scroolSmooth()
    }
  };



  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className={`${page > 1 ? 'pn ' : 'pnInactive'}`} onClick={handlePrev}>
          &#60;
        </li>
        {arrPage.map((e) => (
          <li
            className={`pagination__item ${page === e && "page__active"}`}
            onClick={handlePage}
            key={e}
          >
            {e}
          </li>
        ))}
        <li className={`${page < maxPage ? 'pn' : 'pnInactive'}`} onClick={handleNext}>
          &#62;
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
