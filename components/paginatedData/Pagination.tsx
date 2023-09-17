import React, { ReactNode } from "react";

interface RenderItemProps {
  startIndex: number;
  endIndex: number;
}

interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  renderItem: (props: RenderItemProps) => ReactNode;
}

const Pagination: React.FC<IPagination> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  renderItem,
}) => {
  const getPageButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    const halfVisibleButtons = Math.floor(maxVisibleButtons / 2);

    let startPage = currentPage - halfVisibleButtons;
    let endPage = currentPage + halfVisibleButtons;

    if (startPage <= 0) {
      startPage = 1;
      endPage = Math.min(totalPages, maxVisibleButtons);
    }

    if (endPage > totalPages) {
      startPage = Math.max(totalPages - maxVisibleButtons + 1, 1);
      endPage = totalPages;
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          className={`flex justify-center p-1 w-20 items px-2-center rounded-lg text-xs text-white ${
            page === currentPage ? "bg-red-300" : "bg-red-400"
          }`}
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      );
    }

    return buttons;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div className="w-full">
      {/* Render the items using the renderItem function */}
      {renderItem({ startIndex, endIndex })}
      <div className="flex flex-col space-y-2 p-1 pb-2 border rounded-lg bg-white shadow-lg justify-center items-center">
        <p className="text-black text-xs p-1 font-medium">
          Showing {startIndex + 1} - {endIndex} of {totalItems} items
        </p>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 grid-cols-2 gap-3 p-2">
          <button
            className={`flex justify-center p-1 w-20 items px-2-center rounded-lg text-xs text-white ${
              currentPage === 1 ? "bg-red-300" : "bg-red-400"
            }`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {getPageButtons()}
          <button
            className={`flex justify-center p-1 w-20 items px-2-center rounded-lg text-xs text-white ${
              currentPage === totalPages ? "bg-red-300" : "bg-red-400"
            }`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
