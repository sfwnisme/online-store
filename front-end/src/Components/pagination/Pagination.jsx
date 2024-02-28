import ReactPaginate from 'react-paginate';
import './pagination.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Cookie from 'cookie-universal'
import { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';

function Pagination({ itemsPerPage, data, setPage, page, total }) {
  // const pageCount = Math.ceil(data?.length / itemsPerPage)
  const pageCount = Math.ceil(total / itemsPerPage)
  console.log(total / itemsPerPage)
  console.log(Math.floor(total / itemsPerPage))

  const [value, setValue] = useState(pageCount)

  // useEffect(() => {
  //   // setValue((prev) => !prev ? pageCount : prev)
  //   setValue(pageCount)
  //   // if (+pageCount !== +value) {
  //   // setValue(pageCount)
  //   // } else {
  //   // setValue((prev) => prev)
  // }
  //   // let timer = setTimeout(() => setValue(pageCount), 50)
  //   // return () => clearTimeout(timer)
  // }, [])

  useEffect(() => {
    setValue((prev) => prev ? prev : pageCount)

    let timer = setTimeout(() => setValue((prev) => prev !== pageCount ? pageCount : prev), 2000)
    return () => clearTimeout(timer)

  }, [data, pageCount])

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={value}
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