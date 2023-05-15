import React from "react";
import { usePagination } from "../Hooks/UsePagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage < paginationRange[paginationRange.length - 1]) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div>
      <ul className="flex items-center">
        <li>
          {/* Previous Button */}
          <div
            onClick={onPrevious}
            className="hover:text-indigo-600 hover:bg-gray-50 px-2 py-[10px] border border-r-1 rounded-tl-lg rounded-bl-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </li>
        {paginationRange.map((pageNumber, idx) => (
          <li key={idx}>
            {pageNumber === "..." ? (
              <span className="px-4 py-[9px] border border-l-0">
                {pageNumber}
              </span>
            ) : (
              <div
                onClick={() => onPageChange(pageNumber)}
                className={`px-4 py-2 border border-l-0 duration-150 hover:text-indigo-600 hover:bg-indigo-50 ${
                  currentPage === pageNumber
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : ""
                }`}
              >
                {pageNumber}
              </div>
            )}
          </li>
        ))}
        <li>
          {/* Next Button */}
          <div
            onClick={onNext}
            className="hover:text-indigo-600 hover:bg-gray-50 px-2 py-2 border border-l-0 rounded-tr-lg rounded-br-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 mt-1"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
