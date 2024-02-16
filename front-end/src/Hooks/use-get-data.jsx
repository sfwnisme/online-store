import { useEffect, useState } from "react"
import { AXIOS } from "../Api/AXIOS.JSX"

const useGetData = (ENDPOINT) => {
  //:::
  const [data, setData] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshData, setRefreshData] = useState(true)
  //:::

  //:::
  useEffect(() => {
    setIsLoading(true)
    AXIOS.get(`/${ENDPOINT}`)
      .then((data) => {
        setData(data.data)
        setIsLoading(false)
        setIsEmpty(data.data.length === 0 ? true : false)
        console.log(`:::get ${ENDPOINT} done:::`, data)
      })
      .catch((error) => {
        setIsLoading(false)
        setIsEmpty(false)
        console.log(`+++get ${ENDPOINT} error+++`, error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [ENDPOINT, refreshData])
  //:::

  return {
    data,
    isLoading,
    isEmpty,
    refreshData,
    setRefreshData,
    ENDPOINT
  }
}

export default useGetData

/**
 * @params ENDPOINT - the API end point for the read request
 * @returns {data} - the data returned from the API
 * @returns {isLoading, isEmpty} - handling the data availability
 * @returns {refreshData, setRefreshData} - this state handle recall or refresh the data if you delete or edit data
 * @returns {ENDPOINT} - the endpoint name
 */