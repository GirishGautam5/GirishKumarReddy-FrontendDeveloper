import React from "react";
import "./Pagination.css";

function Pagination(props) {
  const { totalCapsules, capsulesPerPage, currentPage, setCurrentPage } = props;
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalCapsules / capsulesPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
