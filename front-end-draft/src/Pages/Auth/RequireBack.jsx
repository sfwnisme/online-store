import Cookie from 'cookie-universal'
import { Outlet } from 'react-router-dom'

const RequireBack = () => {
    const cookie = Cookie()
    const token = cookie.get('e-commerce')
    return !token ? <Outlet /> : window.history.back()
}

export default RequireBack
