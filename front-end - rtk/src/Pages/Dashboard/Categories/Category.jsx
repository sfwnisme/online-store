import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import usePathname from '../../../Hooks/use-pathname'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleCategory, singleCategorySelector, updateCategory, updateCategorySelector } from '../../../Store/features/categories/categoriesSlice'
import AlertMsg from '../../../Components/AlertMsg'

const Category = () => {
  //:::
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [isMsg, setIsMsg] = useState(false)
  const { id } = usePathname()
  const navigate = useNavigate()
  const focusRef = useRef(null)
  //:::

  //::: tab title
  useEffect(() => {
    document.title = 'Update category'
  }, [])
  //:::

  //:::
  const { data, isLoading, isSuccess, isError, isEmpty, success, error } = useSelector(singleCategorySelector)
  const { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate, isEmpty: isEmptyUpdate, success: successUpdate, error: errorUpdate } = useSelector(updateCategorySelector)
  console.log(isErrorUpdate)
  const dispatch = useDispatch()
  useEffect(() => {
    setTitle(data.title)
    setImage(data.image)
  }, [id, data])
  useEffect(() => {
    dispatch(getSingleCategory())
  }, [dispatch])
  //:::

  //:::
  const Submit = async (e) => {
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append('title', title)
      formData.append('image', image)
      formData.append('id', id)
      const initialData = formData
      await dispatch(updateCategory(initialData)).unwrap()
      setIsMsg(true)
    } catch (error) {
      setIsMsg(true)
      console.log(error)
    }
  }
  //:::

  return (
    <div>
      <div className='form-container form-noimage'>
        <div className='form-box'>
          <h1>Update Category [{id}]</h1>
          <Form onSubmit={Submit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={focusRef} type="text" placeholder="Enter text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>image</Form.Label>
              <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoadingUpdate}>
              {isLoadingUpdate ? 'Updating...' : 'Update'}
            </Button>
          </Form>
          <AlertMsg message={successUpdate?.message || errorUpdate?.message} isError={isErrorUpdate} delay='3000' isMsg={isMsg} setIsMsg={setIsMsg} />
        </div>
      </div>
    </div>
  )
}

export default Category