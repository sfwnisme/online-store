import { AXIOS } from '../Api/AXIOS.JSX'
import { useQuery } from '@tanstack/react-query'

const useGetDataPagination = (ENDPOINT, limit, page) => {
  const gettingData = async (ENDPOINT, limit, page) => await AXIOS.get(`/${ENDPOINT}?limit=${limit}&page=${page}`)

  const { data, status, isLoading, isError, isSuccess, error, refetch } = useQuery({
    queryKey: [ENDPOINT, limit, page],
    queryFn: () => gettingData(ENDPOINT, limit, page),
    gcTime: 0,
    staleTime: 0,
    // refetchOnWindowFocus: true
  })
  const success = 'The user has been successfully grapped'

  return { data: data?.data?.data, status, isLoading, isError, isSuccess, success, error, refetch, total: data?.data?.total }
}

export default useGetDataPagination