import { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { addCategory, addCategorySelector } from '../../../Store/features/categories/categoriesSlice'
import { useDispatch, useSelector } from 'react-redux'
import AlertMsg from '../../../Components/AlertMsg'

const AddCategory = () => {
  //:::
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [isMsg, setIsMsg] = useState(false)
  const focusRef = useRef(null)
  //:::

  //::: tab title
  useEffect(() => {
    focusRef?.current?.focus()
    document.title = 'Add category'
  }, [])
  //:::

  //:::
  const { isLoading, isError, success, error } = useSelector(addCategorySelector)
  const dispatch = useDispatch()
  const Submit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('image', image)
      const initialData = formData
      const res = await dispatch(addCategory(initialData)).unwrap()
      setIsMsg(true)
      location.pathname = '/dashboard/categories'
    } catch (error) {
      setIsMsg(true)
      console.log('+++add category error+++', error)
    }
  }
  //:::

  return (
    <div className='form-container form-noimage'>
      <div className='form-box'>
        <h1>Add Category</h1>
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
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add'}
          </Button>
        </Form>
      </div>
      <AlertMsg
        message={success?.message || error?.message}
        isError={isError}
        isMsg={isMsg}
        setIsMsg={setIsMsg}
      />
    </div>
  )
}

export default AddCategory