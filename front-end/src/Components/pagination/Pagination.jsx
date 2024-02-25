import ReactPaginate from 'react-paginate';
import './pagination.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Pagination({ itemsPerPage, data, setPage, page }) {

  const pageCount = Math.ceil(data?.length / itemsPerPage)
  console.log(pageCount)
  console.log(page)
  console.log(data?.length)


  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
        renderOnZeroPageCount={null}
        containerClassName='pagination-container d-flex justify-conter-end align-items-center'
        pageLinkClassName='pagination-anchor d-grid  mx-2 p-2'
        activeLinkClassName='pagination-active-link text-white bg-primary'
      />
    </>
  );
}
export default Pagination