import Cookie from 'cookie-universal'
import { LOGOUT } from '../../Api/API'
import { AXIOS } from '../../Api/AXIOS.JSX'
import { useState } from 'react'
import PageLoading from '../../Loading/PageLoading/PageLoading'

const Logout = () => {
  //:::
  const cookie = Cookie()
  //:::

  //:::
  const handleLogout = async () => {
    try {
      const res = await AXIOS.get(`/${LOGOUT}`)
      cookie.remove('e-commerce')
      location.pathname = '/login'
      console.log(':::logout done:::', res)
    } catch (error) {
      console.log('+++logout error+++', error)
    }
  }
  //:::

  return (
    <>
      <span onClick={handleLogout}>
        Logout
      </span >
    </>
  )

}

export default Logout