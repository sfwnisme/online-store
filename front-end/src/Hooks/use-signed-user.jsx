import { useEffect, useState } from 'react'
import { AXIOS } from '../Api/AXIOS.JSX'
import { USER } from '../Api/API'

const useSignedUser = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    try {
      AXIOS.get(`${USER}`)
        .then((data) => {
          setCurrentUser(data.data)
        })
    } catch (error) {
      console.log('+++get single data error+++', error)
    }
  }, [])

  return { endpoint: USER, currentUser }
}

export default useSignedUser

/**NOTE
 * ?this hook returns the data after fetching it from the API
 * @param endpoint - the single data endpoint => ex: user, category
 * @returns { endpoint:string, data:{...} } - the value hooke 
 * return the endpoint and the fetched data
 */
