import { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import useGetData from '../../../Hooks/use-get-data'
import { categoriesSelector, getCategories } from '../../../Store/features/categories/categoriesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, addProductSelector } from '../../../Store/features/products/productsSlice'
import AlertMsg from '../../../Components/AlertMsg'
import getFileSize from '../../../utils/getFileSize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import shortText from '../../../utils/shortText'
import { AXIOS } from '../../../Api/AXIOS.JSX'
import { PRO } from '../../../Api/API'

//['category', 'title', 'description', 'About', 'price', 'discount'];
const AddProductCopy = () => {
  //:::
  const [form, setForm] = useState({
    category: 'Select Category',
    title: '',
    description: '',
    price: '',
    discount: '',
    About: '',
  })
  const dummyForm = {
    category: null,
    title: 'dummy title',
    description: 'dummy description',
    price: 1000,
    discount: 0,
    About: 'dummy about',
  }
  const [images, setImages] = useState([])
  const [isMsg, setIsMsg] = useState(false)
  const [dummySent, setDummySent] = useState(false)
  const [productId, setProductId] = useState('')
  const fileRef = useRef(null)
  // const progressRef = useRef([])
  //:::

  //:::
  const focusRef = useRef(null)
  useEffect(() => {
    // using optional chain avoiding the error if there's no current
    focusRef?.current?.focus()
  }, [])
  //:::

  //::: posting product
  const { isLoading, isError, success, error } = useSelector(addProductSelector)
  const dispatch = useDispatch()

  const Submit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    // loop the form state to append it to the formData dynamically
    let formObjectToArray = Object.entries(form)
    for (const [key, value] of formObjectToArray) {
      console.log("key:", key, "value:", value)
      formData.append(key, value)
    }

    // // images must write this way "images[]" with empty array
    // // for the backend to understand it
    // for (let i = 0; i < images.length; i++) {
    //   formData.append('images[]', images[i])
    // }
    console.log(...formData)
    const initialData = formData

    try {
      await dispatch(addProduct(initialData)).unwrap()
      setIsMsg(true)
    } catch (error) {
      setIsMsg(true)
      console.log('+++add product error+++', error)
    }
  }
  //:::

  //:::
  const handleDummy = async () => {
    try {
      const res = await AXIOS.post(`/${PRO}/add`, dummyForm)
      setProductId(res?.data?.id)
      console.log(':::handle dummy done:::', res)
    } catch (error) {
      console.log(error)
    }
  }
  //:::
  console.log('product id =>>>>>', productId)

  //::: handle selection changes
  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setForm({ ...form, [name]: value })
    setDummySent(true)
    // return the dummy funtion only single time to avoid repeated requests
    !dummySent ? handleDummy() : null
  }
  //:::

  // const lengthRef = useRef(0)

  //::: handle images posting
  console.log(images)
  const handleUploadImages = async (e) => {
    const nextImages = [...e.target.files].map((file) => ({ image: file, uploadProgress: 0 }))
    setImages((prev) => [...prev, ...nextImages])
    console.log('next images ===================', nextImages)

    // setImages((prev) => [...prev, ...e.target.files])
    let imagesList = e.target.files
    console.log('images list ', imagesList)

    const formData = new FormData()
    for (let i = 0; i <= imagesList.length; i++) {
      formData.append('image', imagesList[i])
      formData.append('product_id', productId)
      try {
        const res = await AXIOS.post(`/product-img/add`, formData, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent
            let prog = ProgressEvent
            console.log(prog)
            let percent = Math.floor(loaded / total * 100)
            if (percent % 10 === 0) {
              // progressRef.current[lengthRef.current].style.width = `${percent}%`
              // progressRef.current[lengthRef.current].setAttribute('percent', percent)
              setImages(prev => prev.map((el, idx) => idx === i ? { ...el, uploadProgress: percent } : el))
              // images[i].uploadProgress = percent
              // console.log('>>>>>>>>>>>>>>>>>>>>>>>', images[i].uploadProgress)
            }
          }
        })
        console.log('uploads of images>>>>>>>>>>>', res)
        // lengthRef.current++
      } catch (error) {
        console.log('images error', error)
      }
    }
  }
  //:::

  //:::
  const { data: categories } = useGetData(getCategories, categoriesSelector)
  const showCategories = categories.map((cat) => <option value={cat.id} key={cat.id}>{cat.title}</option>)
  //:::
  //:::
  // URL.createObjectURL(image) - is an js API to convert image object file to image url
  const showImages = images.map((img, index) =>
    <div key={index} className='d-flex flex-column gap-2 border rounded border-gray p-2'>
      <div className='d-flex flex-row gap-3'>
        <img src={URL.createObjectURL(img?.image)} width='100' height='auto' className='rounded' />
        <div className='d-flex flex-column'>
          <p className='mb-2 font-weight-bold'>{shortText(img?.image?.name, 30)}</p>
          <small>{getFileSize(img?.image?.size)}</small>
        </div>
      </div>
      <div className="upload-image-progress rounded">
        <span
          className="inner-upload-image-progress"
          // ref={(e) => progressRef.current.push(e)}
          percent={img?.uploadProgress}
          style={{ width: `${img?.uploadProgress}%` }}
        // ref={(e) => (progressRef.current[index] = e)}
        >

        </span>
      </div>
    </div>
  )
  //:::

  return (
    <div>
      <div className='form-container form-noimage'>
        <div className='form-box'>
          <h1>Add User</h1>
          <Form onSubmit={handleDummy}>

            <Form.Group className="mb-4 input-container">
              <Form.Select type='text' id="category" name='category' placeholder=""
                value={form.category} onChange={handleChange} required ref={focusRef}>
                <option disabled>Select Category</option>
                {showCategories}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4 input-container">
              <Form.Control type='text' id="title" name='title' placeholder=""
                value={form.title} onChange={handleChange} required disabled={!dummySent} />
              <Form.Label htmlFor="name">Title</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='text' id="description" name='description' placeholder=""
                value={form.description} onChange={handleChange} required disabled={!dummySent} />
              <Form.Label htmlFor="name">Description</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='number' id="price" name='price' placeholder=""
                value={form.price} onChange={handleChange} required disabled={!dummySent} />
              <Form.Label htmlFor="name">Price</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='number' id="discount" name='discount' placeholder=""
                value={form.discount} onChange={handleChange} required disabled={!dummySent} />
              <Form.Label htmlFor="name">Discount</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='text' id="About" name='About' placeholder=""
                value={form.About} onChange={handleChange} required disabled={!dummySent} />
              <Form.Label htmlFor="name">About</Form.Label>
            </Form.Group>

            <Form.Group className="mb-4 input-container">
              <Form.Control type='file' id="images" name='images'
                onChange={(e) => handleUploadImages(e)}
                multiple
                required
                disabled={!dummySent}
                ref={fileRef}
                hidden />
            </Form.Group>

            <div className='upload-image' onClick={() => fileRef.current.click()} style={{ filter: `grayscale(${dummySent ? 0 : 1})` }}>
              <FontAwesomeIcon icon={faFileUpload} size='2xl' className='fa-light' />
              <p>Upload the images from this section</p>
            </div>
            <div className='d-flex flex-column gap-4 mb-4'>{showImages}</div>
            <Button variant="primary" size="sm" type="submit" disabled={isLoading}>
              {
                isLoading
                  ? 'Adding Product...'
                  : 'Add Product'
              }
            </Button>
          </Form>
          <AlertMsg message={success?.message || error?.message} isError={isError} delay='3000' isMsg={isMsg} setIsMsg={setIsMsg} />
        </div>
      </div>
    </div >
  )
}

export default AddProductCopy