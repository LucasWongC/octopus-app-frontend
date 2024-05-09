import { FC } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Props = {
  total: number;
  offset: number;
  limit: number;
  count: number;
  fetch: (offset: number) => Promise<void>;
};

const Pagination: FC<Props> = ({ total, offset, limit, count, fetch }) => {
  const currentPage = Math.floor(offset / limit);
  const pageCount = Math.ceil(total / limit);
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-darkgrey-600 border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between items-center sm:hidden">
        <div className="relative inline-flex items-center font-medium text-sm px-3 py-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 hover:text-gray-200 cursor-not-allowed rounded-md">
          Previous
        </div>
        <div className="text-sm dark:text-white">Page 1</div>
        <div className="relative inline-flex items-center font-medium text-sm px-3 py-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 cursor-pointer rounded-md ml-3">
          Next
        </div>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div className="flex flex-row items-center gap-4">
          <div className="text-sm dark:text-white">
            Showing <span className="font-medium">{offset + 1}</span> to{" "}
            <span className="font-medium">{offset + count}</span>
          </div>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              className="relative inline-flex items-center font-medium text-sm px-3 py-1 bg-white dark:bg-darkgrey-400 hover:bg-gray-50 border border-gray-300 text-gray-700 hover:text-gray-200 cursor-pointer disabled:cursor-not-allowed dark:text-white rounded-l-md"
              disabled={currentPage == 0}
              onClick={() => fetch(offset - limit)}
            >
              <span className="sr-only">Previous</span>
              <FaArrowLeft className="w-4 h-4" />
            </button>
            {currentPage > 1 && (
              <button
                className="relative inline-flex items-center font-medium text-sm px-3 py-1 bg-white dark:bg-darkgrey-400 hover:bg-gray-50 border border-gray-300 text-gray-700 z-10 border-primary bg-primary-50 hover:bg-primary-50 cursor-pointer dark:text-white"
                onClick={() => fetch(0)}
              >
                1
              </button>
            )}
            {currentPage > 2 && (
              <span className="relative inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-white dark:bg-darkgrey-400 border border-gray-300 dark:text-white">
                ...
              </span>
            )}
            {currentPage > 0 && (
              <button
                className="relative inline-flex items-center font-medium text-sm px-3 py-1 bg-white dark:bg-darkgrey-400 hover:bg-gray-50 border border-gray-300 text-gray-700 z-10 border-primary bg-primary-50 hover:bg-primary-50 cursor-pointer dark:text-white"
                onClick={() => fetch((currentPage - 1) * limit)}
              >
                {currentPage}
              </button>
            )}
            <span className="relative inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-white dark:bg-darkgrey-400 border border-gray-300 dark:text-white">
              {currentPage + 1}
            </span>
            {currentPage < pageCount - 1 && (
              <button
                className="relative inline-flex items-center font-medium text-sm px-3 py-1 bg-white dark:bg-darkgrey-400 hover:bg-gray-50 border border-gray-300 text-gray-700 z-10 border-primary bg-primary-50 hover:bg-primary-50 cursor-pointer dark:text-white"
                onClick={() => fetch((currentPage + 1) * limit)}
              >
                {currentPage + 2}
              </button>
            )}
            {currentPage < pageCount - 3 && (
              <span className="relative inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-white dark:bg-darkgrey-400 border border-gray-300 dark:text-white">
                ...
              </span>
            )}
            {currentPage < pageCount - 2 && (
              <button
                className="relative inline-flex items-center font-medium text-sm px-3 py-1 bg-white dark:bg-darkgrey-400 hover:bg-gray-50 border border-gray-300 text-gray-700 z-10 border-primary bg-primary-50 hover:bg-primary-50 cursor-pointer dark:text-white"
                onClick={() => fetch((pageCount - 1) * limit)}
              >
                {pageCount}
              </button>
            )}
            <button
              className="relative inline-flex items-center font-medium text-sm px-3 py-1 bg-white dark:bg-darkgrey-400 hover:bg-gray-50 border border-gray-300 text-gray-700 cursor-pointer  disabled:cursor-not-allowed dark:text-white rounded-r-md"
              disabled={currentPage == pageCount - 1}
              onClick={() => fetch(offset + limit)}
            >
              <span className="sr-only">Next</span>
              <FaArrowRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
