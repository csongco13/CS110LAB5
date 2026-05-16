function Pagination({ totalPages, currentPage, setCurrentPage }) {
  return (
    <div id="pagination" className="pagination">
      {Array.from({ length: totalPages }, (value, index) => {
        let buttonClass = "page-button";

        if (currentPage === index + 1) {
          buttonClass = "page-button active";
        }

        return (
          <button
            key={index}
            className={buttonClass}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;