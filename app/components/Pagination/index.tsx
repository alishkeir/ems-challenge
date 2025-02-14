const Pagination = ({ currentPage, totalPages, handlePageChange }: any) => {
  return (
    <div className='pagination flex justify-center'>
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className='px-4 py-2 bg-blue-500 text-white rounded-md'
        >
          Previous
        </button>
      )}

      <span className='px-4 py-2'>
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className='px-4 py-2 bg-blue-500 text-white rounded-md'
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
