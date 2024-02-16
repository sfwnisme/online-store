import { useEffect, useRef, useState } from 'react'
import usePathname from './use-pathname'
import { useNavigate } from 'react-router-dom'
import { AXIOS } from '../Api/AXIOS.JSX'
import { CAT } from '../Api/API'

const useSingleCategory = () => {
  //:::
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [disable, setDisable] = useState(true)
  const focusRef = useRef(null)
  //:::

  //:::
  const { id, pathname } = usePathname()
  const navigate = useNavigate()
  //:::

  //:::
  useEffect(() => {
    setDisable(true)
    AXIOS.get(`${CAT}/${id}`)
      .then((data) => {
        setTitle(data?.data?.title)
        setDisable(false)
      })
      .catch((error) => {
        setDisable(false)
        navigate(`${pathname}/👈😉ERROR404/`, { replace: true })
        console.log('+++get category error+++', error)
      }).finally(() => {
        setDisable(false)
      })
    focusRef.current.focus()
  }, [id, navigate, pathname])
  //:::


  return { title, setTitle, image, setImage, disable, setDisable, focusRef }
}

export default useSingleCategory