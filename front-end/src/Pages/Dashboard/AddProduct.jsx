import { useEffect, useRef, useState } from 'react'
import { AXIOS } from '../../Api/AXIOS.JSX'
import { CATS, PRO } from '../../Api/API'
import { Alert, Button, Form } from 'react-bootstrap'
import useGetData from '../../Hooks/use-get-data'

//['category', 'title', 'description', 'About', 'price', 'discount'];
const AddProduct = () => {
  //:::
  const [form, setForm] = useState({
    category: 'Select Category',
    title: '',
    description: '',
    price: '',
    discount: '',
    About: '',
  })
  const [images, setImages] = useState([])
  //:::

  //:::
  const focusRef = useRef(null)
  useEffect(() => {
    // using optional chain avoiding the error if there's no current
    focusRef?.current?.focus()
  }, [])
  //:::

  //:::
  const Submit = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    // loop the form state to append it to the formData dynamically
    let formObjectToArray = Object.entries(form)
    for (const [key, value] of formObjectToArray) {
      console.log("key:", key, "value:", value)
      formData.append(key, value)
    }

    // images must write this way "images[]" with empty array
    // for the backend to understand it
    for (let i = 0; i < images.length; i++) {
      formData.append('images[]', images[i])
    }

    try {
      const res = await AXIOS.post(`/${PRO}/add`, formData)
      console.log(':::add product done:::', res)
    } catch (error) {
      console.log('+++add product error+++', error)
    }
  }
  //:::

  //:::
  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setForm({ ...form, [name]: value })
  }
  //:::

  //:::
  const { data: categories } = useGetData(CATS)
  const showCategories = categories.map((cat) => <option value={cat.id} key={cat.id}>{cat.title}</option>)
  //:::

  //:::
  // URL.createObjectURL(image) - is an js API to convert image object file to image url
  const showImages = images.map((img, index) =>
    <div key={index} className='d-flex gap-4 border border-gray p-2'>
      <img src={URL.createObjectURL(img)} width='100' height='auto' />
      <div className='d-flex flex-column'>
        <p className='mb-2 font-weight-bold'>{img.name.substring(0, 20)}...</p>
        <small>{
          img.size / 1024 < 900
            ? (img?.size / 1024).toFixed(2) + 'KB'
            : (img?.size / (1024 * 1024)).toFixed(2) + 'MB'
        }</small>
      </div>
    </div>
  )
  //:::

  return (
    <div>
      <div className='form-container form-noimage'>
        <div className='form-box'>
          <h1>Add User</h1>
          <Form onSubmit={Submit}>

            <Form.Group className="mb-4 input-container">
              <Form.Select type='text' id="category" name='category' placeholder=""
                value={form.category} onChange={handleChange} required ref={focusRef}>
                <option disabled>Select Category</option>
                {showCategories}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4 input-container">
              <Form.Control type='text' id="title" name='title' placeholder=""
                value={form.title} onChange={handleChange} required />
              <Form.Label htmlFor="name">Title</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='text' id="description" name='description' placeholder=""
                value={form.description} onChange={handleChange} required />
              <Form.Label htmlFor="name">Description</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='number' id="price" name='price' placeholder=""
                value={form.price} onChange={handleChange} required />
              <Form.Label htmlFor="name">Price</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='number' id="discount" name='discount' placeholder=""
                value={form.discount} onChange={handleChange} required />
              <Form.Label htmlFor="name">Discount</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='text' id="About" name='About' placeholder=""
                value={form.About} onChange={handleChange} required />
              <Form.Label htmlFor="name">About</Form.Label>
            </Form.Group>

            <Form.Group className="mb-4 input-container">
              <Form.Control type='file' id="images" name='images'
                onChange={(e) => setImages([...e.target.files])} multiple required />
              <Form.Label htmlFor="name">About</Form.Label>
            </Form.Group>


            <div className='d-flex flex-column gap-4'>{showImages}</div>
            <Button variant="primary" size="sm" type="submit">
              Add
            </Button>
            {
              <Alert variant='danger' className='credentials-error'>
                error message
              </Alert>
            }
          </Form>
        </div>
      </div>
    </div >
  )
}

export default AddProduct