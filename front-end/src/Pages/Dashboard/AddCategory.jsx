import { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { AXIOS } from '../../Api/AXIOS.JSX'
import { CAT } from '../../Api/API'

const AddCategory = () => {
  //:::
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [disable, setDisable] = useState(true)
  const focusRef = useRef(null)
  //:::

  //:::
  useEffect(() => {
    focusRef?.current?.focus()
    setDisable(false)
  }, [])
  //:::

  //:::
  const Submit = async (e) => {
    e.preventDefault()
    setDisable(true)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('image', image)
      const res = await AXIOS.post(`${CAT}/add`, formData)
      setDisable(false)
      console.log(':::add category done:::', res)
    } catch (error) {
      setDisable(false)
      console.log('+++add category error+++', error)
    } finally {
      setDisable(false)
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
          <Button variant="primary" type="submit" disabled={disable}>
            {disable ? 'loading...' : 'Submit'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default AddCategory