import ReactPaginate from "react-paginate";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
const Pagination = ({ users, setPageNumber, usersPerPage }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const pageCount = Math.ceil(users?.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    scrollToTop();
    if (users?.length == 0) {
      return null;
    }
  };
  return (
    <div className="paginate my-4">
      <ReactPaginate
        previousLabel={<KeyboardArrowLeftIcon />}
        nextLabel={<ChevronRightIcon />}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>

  );
};

export default Pagination;
