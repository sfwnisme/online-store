import axios from "axios"
import { useEffect } from "react"
import { BASE_URL, GOOGLE_CALL_BACK } from "../../Api/API"
import { useLocation } from "react-router-dom"
import Cookie from 'cookie-universal'

const GoogleCallBack = () => {

  //:::
  const { search } = useLocation()
  //:::

  //:::
  const cookie = Cookie()
  //:::

  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(`${BASE_URL}/${GOOGLE_CALL_BACK}${search}`)
        cookie.set('e-commerce', res?.data?.access_token)
      } catch (error) {
        console.log('+++get google call error+++', error)
      }
    }
    GoogleCall()
  }, [])

  return (
    <div>GoogleCallBack</div>
  )
}

export default GoogleCallBack