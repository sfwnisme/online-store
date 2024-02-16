/* eslint-disable react/prop-types */
import axios from 'axios'
import Cookie from 'cookie-universal'
import { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL, USER } from '../../Api/API'
import PageLoading from '../../Loading/PageLoading/PageLoading'
import Err403 from '../Dashboard/Err403'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../Store/features/users/usersSlice'

const RequireAuth = (props) => {
    //:::
    // const [user, setUser] = useState('')
    const { data: user } = useSelector(currentUserSelector)
    //:::

    //:::
    const cookie = Cookie()
    const token = cookie.get('e-commerce')
    //:::

    return token ? (
        !user ? (
            <PageLoading />
        ) : props?.allowedRole?.includes(user?.role) ? (
            <Outlet />
        ) : (
            <Err403 role={user?.role} />
        )
    ) : (
        <Navigate to={'/login'} replace={true} />
    )
}

export default RequireAuth