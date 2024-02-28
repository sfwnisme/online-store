import { Button, Form } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import getUserType from "../utils/getUserType.jsx";
import { useCallback, useEffect, useState } from "react";
import useGetData from "../Hooks/use-get-data.jsx";
import { useDispatch, useSelector } from "react-redux";
import AlertMsg from "./AlertMsg.jsx";
import Pagination from "./pagination/Pagination.jsx";
import useGetDataPagination from "../Hooks/use-get-data-pagination.jsx";
import { AXIOS } from '../Api/AXIOS.jsx'
import { debaouce } from '../utils/debounce.jsx';
const TableShow = (props) => {
  //::: handle props 
  let { header, SELECTOR, DISPATCHER, DELETEACTION, DELETESELECTOR, currentUser, title, addLink, addTitle } = props
  currentUser = currentUser || { id: '' }
  //:::

  //:::
  /**
   * -----------------------------------------------
   * STATES
   * -----------------------------------------------
   * 
   */
  const [tableData, setTableData] = useState([]) // handle better visualization for deleting
  const [filteredData, setFilteredData] = useState([])
  const [deletedID, setDeletedID] = useState(null) // target the selected data
  const [isMsg, setIsMsg] = useState(false)
  const [search, setSearch] = useState('')
  const [searchIsLoading, setSearchIsLoading] = useState(false)
  //:::
  const dataOrSearch = search?.length > 0 ? filteredData : tableData

  //::: pagination
  // const start = +(props?.page - 1) * +(props?.limit)
  // const end = +start + Number(props?.limit)
  // const final = tableData?.slice(start, end)
  // console.log(start)
  // console.log(end)
  // console.log(final)
  // console.log(tableData)
  //:::


  // this factors working normally but I used react query and paginated data
  //::: 
  // const {
  //   data,
  //   isLoading: isLoadingData,
  //   isEmpty: isEmptyData,
  // } = useGetData(DISPATCHER, SELECTOR)

  // useEffect(() => {
  //   setTableData(data)
  // }, [data])
  //:::

  /*
  |-----------------------------------------------
  |pagination
  |-----------------------------------------------
  */
  const {
    data,
    isLoading: isLoadingData,
    total
  } = useGetDataPagination(props?.ENDPOINT, props?.limit, props?.page)
  // console.log(paginatedData)

  useEffect(() => {
    if (data?.length === 0) {
      debaouce(() => setTableData(data), 200)
    } else {
      setTableData(data)
    }
  }, [data])


  /*
  |-----------------------------------------------
  | functions
  |-----------------------------------------------
  */
  const dispatch = useDispatch()
  const {
    isLoading: isLoadingDelete,
    isSuccess: isSuccessDelete,
    isError: isErrorDelete,
    success: successDelete,
    error: errorDelete
  } = useSelector(DELETESELECTOR)

  // delete data function
  const handleDelete = async (id) => {
    setDeletedID(id)
    try {
      await dispatch(DELETEACTION(id)).unwrap()
      setDeletedID(null)
      setTableData((prev) => prev.filter((pre) => pre.id !== id))
      setIsMsg(true)
    } catch (error) {
      setIsMsg(true)
    } finally {
      setDeletedID(null)
    }
  }

  // search funtion
  const handleSearch = useCallback(async () => {
    try {
      const res = await AXIOS.post(`/${props?.searchEndpoint}/search?title=${search}`)
      setFilteredData(res?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setSearchIsLoading(false)
    }
  }, [search, props?.searchEndpoint])

  useEffect(() => {
    setSearchIsLoading(true)
    const delay = 500
    const timer = setTimeout(() => {
      search?.length > 0 ? handleSearch() : setSearchIsLoading(false)
    }, [delay])
    return () => clearTimeout(timer)
  }, [search])


  /*
  |-----------------------------------------------
  |data to DOM
  |-----------------------------------------------
  */

  // table header data
  const headerShow = header.map((head, index) => <th key={index}>{head?.name}</th>)

  // the entire table data
  const dataShow = dataOrSearch?.map((item, index) => (
    <tr key={index}>
      {header.map((item2, index2) => (
        <td key={index2}>
          {/* {item2?.key === 'image' ? <img src={item?.image} width='100px' height='50px' /> : getUserType(item[item2?.key])} */}
          {/* {item2?.key === 'images' && <div>{item[item2.key]?.map(((img, idx) => <img src={img?.image} alt="image for product" key={idx} />))}</div>} */}
          {
            item2?.key === 'image'
              ? <img src={item?.image} width='100px' height='50px' />
              : item2?.key === 'images'
                ? <div>{item[item2?.key]?.map(((img, idx) => <img src={img?.image} alt="image for product" key={idx} height='50px' />))}</div>
                : getUserType(item[item2?.key])
          }

          {currentUser && item[item2?.key] === currentUser?.name && '(you)'}
        </td>
      ))}
      <td style={{ width: '90px' }}>
        <NavLink to={`${item?.id}`}>
          <Button variant={"primary"} size={"sm"} disabled={isLoadingData}>
            <FontAwesomeIcon icon={faEdit} size={"xs"} />
          </Button>
        </NavLink>
        <span> </span>
        {
          currentUser.id !== item.id &&
          <Button variant={"danger"} size={"sm"} onClick={() => handleDelete(item?.id)} id={item?.id} disabled={isLoadingData || isLoadingDelete}>
            {isLoadingDelete && deletedID === item?.id ? '...' : <FontAwesomeIcon icon={faTrash} size={"xs"} />}
          </Button>
        }
      </td>
    </tr>
  )
  )
  //:::

  // dummy empty data to handle the loading 
  let newArray = Array.apply(null, Array(+props?.limit))

  const dataLoading = newArray.fill('').map((item, index) => (
    <tr key={index} style={{ filter: 'grayscale(1)' }}>
      {
        header.map((item2, index) => <td key={index}>loading...</td>)
      }
      <td style={{ width: '100px' }}>
        <Button variant={"danger"} size={"sm"} onClick={() => handleDelete(item?.id)} id={item?.id}>
          ...
        </Button>
        <span> </span>
        <a>
          <Button variant={"primary"} size={"sm"}>
            ...
          </Button>
        </a>
      </td>
    </tr>
  )
  )

  const searchIsLoadingData = newArray.fill('').map((item, index) => (
    <tr key={index} style={{ filter: 'grayscale(1)' }} >
      {
        header.map((item2, index) => <td key={index}>loading...</td>)
      }
      <td colSpan={12} style={{ width: '100px' }}>
        Searchin....
      </td>
    </tr>
  )
  )



  // not found message
  const dataNotFound = <tr colSpan='12'><td colSpan={12} style={{ textAlign: 'center' }}>No data found</td></tr>


  // displayed data
  let content;
  if (isLoadingData && !searchIsLoading) {
    content = dataLoading
  } else if (!isLoadingData && searchIsLoading) {
    content = searchIsLoadingData
  } else if (!isLoadingData && !searchIsLoading && tableData?.length != 0 || filteredData?.length != 0) {
    console.log('')
    content = dataShow
  } else if (!isLoadingData && !searchIsLoading && tableData?.length == 0 && filteredData?.length === 0) {
    console.log('not found')
    content = dataNotFound
  } else if (!isLoadingData && !searchIsLoading  && tableData?.length > 0 && filteredData?.length === 0) {
    console.log('search not found')
    content = <h1>searchin...</h1>
  }

  console.log(filteredData)


  return (
    <div>
      <div className="d-flex align-items-center justify-content-center gap-2">
        <Form.Control
          type='text'
          id="price"
          name='price'
          placeholder=""
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search?.length === 0 ?
          <>
            <select name="" id="" onChange={(e) => props?.setLimit(e.target.value)}>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
            <Pagination itemsPerPage={props?.limit} data={tableData} page={props?.page} setPage={props?.setPage} limit={props?.limit} setLimit={props?.setLimit} total={total} />
          </>
          : null
        }
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>{title}</h1>
        <NavLink to={addLink}>
          <Button variant="outline-primary" size="sm">
            {addTitle}
          </Button>
        </NavLink>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {headerShow}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {
            isLoadingData && !searchIsLoading ? dataLoading : searchIsLoadingData
          }
          {
            tableData?.length === 0 ? dataNotFound : ''
          }
          {
            !isLoadingData && dataShow
          } */}
          {content}
        </tbody>
      </Table>
      <AlertMsg
        message={successDelete?.message || errorDelete?.message}
        isError={isErrorDelete}
        isSuccess={isSuccessDelete}
        isMsg={isMsg}
        setIsMsg={setIsMsg}
        delay='1000'
      />
    </div>
  )
}

export default TableShow

