import Cookie from 'cookie-universal'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, logoutSelector } from '../../Store/features/auth/logoutSlice'

const Logout = () => {
  //:::
  const cookie = Cookie()
  //:::

  //:::
  const { isLoading, isSuccess, isError, success, error } = useSelector(logoutSelector)
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      const res = await dispatch(logoutUser()).unwrap()
      cookie.remove('e-commerce')
      location.pathname = '/'
    } catch (error) {
      console.log('+++logout error+++', error)
    }
  }
  //:::

  return (
    <>
      <span onClick={handleLogout} >
        {
          isLoading
            ? 'Logout...'
            : 'Logout'
        }
      </span >
    </>
  )

}

export default Logout