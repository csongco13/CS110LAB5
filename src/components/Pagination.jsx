function Pagination({ totalPages, currentPage, setCurrentPage }) {
  return (
    <div id="pagination" className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={currentPage === index + 1 ? "page-button active" : "page-button"}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;