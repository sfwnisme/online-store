import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetData = (DISPATCHER, SELECTOR) => {
  //:::
  const [refreshData, setRefreshData] = useState(false)
  //:::

  //:::
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(DISPATCHER())
  }, [dispatch, DISPATCHER, refreshData])
  const {
    data,
    isLoading,
    isEmpty,
    isSuccess,
    isError,
    success,
    error,
  } = useSelector(SELECTOR)
  //:::

  return { data, isLoading, isEmpty, isError, isSuccess, success, error, setRefreshData }
}

export default useGetData