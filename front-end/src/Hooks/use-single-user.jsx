import { useEffect, useState } from 'react'
import { AXIOS } from '../Api/AXIOS.JSX'
import { USER } from '../Api/API'
import usePathname from './use-pathname'
import { useNavigate } from 'react-router-dom'

const useSingleUser = () => {
  //:::
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [disable, setDisable] = useState(true)
  //:::

  //:::
  const navigate = useNavigate()
  const { id, pathname } = usePathname()
  //:::


  useEffect(() => {
    setDisable(true)
    AXIOS
      .get(`${USER}/${id}`)
      .then((data) => {
        setName(data.data.name)
        setEmail(data.data.email)
        setRole(data.data.role)
      })
      .catch((error) => {
        setDisable(false)
        navigate(`${pathname}/👈😉ERROR404`, { replace: true }) // if there not user id go for create none exist route to invoke the error page
        console.log('+++get user error+++', error)
      })
      .finally(() => {
        setDisable(false)
      })
  }, [id, pathname, navigate])
  return { setName, name, setEmail, email, setRole, role, setDisable, disable }
}

export default useSingleUser

/**
 * THIS HOOK HANDLE GET A SINGLE USER FROM THE BACKEND
 * the purpose using fitching it in a hook is to make the user component more clean
 */