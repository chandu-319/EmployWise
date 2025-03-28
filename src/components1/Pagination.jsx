
import "./Style.css"; // Import CSS for styling

const Pagination = ({ page, totalPages, onPageChange }) => (
  <div className="pagination-container">
    <button
      className="pagination-btn"
      onClick={() => onPageChange(page - 1)}
      disabled={page === 1}
    >
      Previous
    </button>
    
    <span className="pagination-text">Page {page} of {totalPages}</span>

    <button
      className="pagination-btn"
      onClick={() => onPageChange(page + 1)}
      disabled={page === totalPages}
    >
      Next
    </button>
  </div>
);

export default Pagination;
