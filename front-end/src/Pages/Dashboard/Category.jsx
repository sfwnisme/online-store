import { Button, Form } from 'react-bootstrap'
import { AXIOS } from '../../Api/AXIOS.JSX'
import { CAT } from '../../Api/API'
import { useNavigate } from 'react-router-dom'
import usePathname from '../../Hooks/use-pathname'
import useSingleCategory from '../../Hooks/use-single-category'

const Category = () => {
  //:::
  const { id } = usePathname()
  const navigate = useNavigate()
  //:::

  //::: get category using custom hook make code cleaner
  const {
    title,
    setTitle,
    image,
    setImage,
    disable,
    setDisable,
    focusRef
  } = useSingleCategory()
  //:::


  //:::
  const Submit = async (e) => {
    e.preventDefault()
    setDisable(true)
    let formData = new FormData()
    formData.append('title', title)
    formData.append('image', image)
    try {
      const res = await AXIOS.post(`${CAT}/edit/${id}`, formData)
      setDisable(false)
      navigate('/dashboard/categories')
      console.log(':::edit category done:::', res)
    } catch (error) {
      setDisable(false)
      console.log('+++edit category error+++', error)
    } finally {
      setDisable(false)
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
            <Button variant="primary" type="submit" disabled={disable}>
              {disable ? 'Updating...' : 'Update'}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Category