import { useEffect, useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { categoriesSelector, getCategories } from '../../../Store/features/categories/categoriesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, addProductSelector, getSingleProduct, singleProductSelector } from '../../../Store/features/products/productsSlice'
import usePathname from '../../../Hooks/use-pathname'
import shortText from '../../../utils/shortText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faTrash } from '@fortawesome/free-solid-svg-icons'
import AlertMsg from '../../../Components/AlertMsg'
import { AXIOS } from '../../../Api/AXIOS.JSX'
import getFileSize from '../../../utils/getFileSize'

const Product = () => {
  //:::states
  const [form, setForm] = useState({
    category: 'Select Category',
    title: '',
    description: '',
    price: '',
    discount: '',
    About: '',
  })
  const [categories, setCategories] = useState('')
  const [images, setImages] = useState([])
  const [imagesFromServer, setImagesFromServer] = useState([])
  const [imagesFromServerIds, setImagesFromServerIds] = useState([])
  const [freezeOnUploading, setFreezeOnUploading] = useState(false)
  const [isMsg, setIsMsg] = useState(false)
  const selectFileRef = useRef(null)
  const progressRef = useRef([])
  const idsRef = useRef([])
  const lengthRef = useRef(-1)
  const { id } = usePathname()
  const [refetching, setRefetching] = useState(false)
  //:::

  //:::
  const { data: categoriesData, isLoading: isLoadingCategories, isError: isErrorCategories } = useSelector(categoriesSelector)
  const showCategories = categoriesData?.map((cate) => (
    <option value={cate?.id} id={cate?.id} key={cate?.id}>{cate.title}</option>
  ))
  const { data: product, isLoading: isLoadingProduct, isError: isErrorProduct } = useSelector(singleProductSelector)
  console.log(product)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getSingleProduct())
  }, [dispatch, refetching])


  const formToEntries = Object.entries(form)
  useEffect(() => {
    // setForm(product)
    for (const [key] of formToEntries) {
      setForm((prev) => ({ ...prev, [key]: product[key] }))
    }
    setImagesFromServer(product?.images)
    console.log('doooooooooooooooooooooooooooooooooooooooooooone', form)
  }, [product, dispatch])
  //:::
  console.log(imagesFromServer)

  /**
     *! :::::::::::::::::::::::::::::::::::::::::::::::::::::
     *! FUNCTIONS START :::::::::::::::::::::::::::::::::::::
     *! :::::::::::::::::::::::::::::::::::::::::::::::::::::
    */

  let { isLoading, isError, isSuccess, success, error } = useSelector(addProductSelector)

  const Submit = async (e) => {
    e.preventDefault()
    console.log('lkjasldfasdf')

    const formData = new FormData()
    // loop the form state to append it to the formData dynamically
    let formObjectToArray = Object.entries(form)
    for (const [key, value] of formObjectToArray) {
      console.log("key:", key, "value:", value)
      formData.append(key, value)
    }
    const initialData = { formData, productId: id }

    try {
      if (imagesFromServerIds) {
        for (let i = 0; i < imagesFromServerIds.length; i++) {
          await AXIOS.delete('/product-img/' + imagesFromServerIds[i])
        }
        setImagesFromServerIds([])
      }

      await dispatch(addProduct(initialData)).unwrap()
      // location.pathname = '/dashboard/products'
      setImages([])
      setIsMsg(true)
      setRefetching((prev) => !prev)
      //test-------------------
      progressRef.current = []
      idsRef.current = []
      lengthRef.current = -1
      //test-------------------
    } catch (error) {
      setIsMsg(true)
      console.log('+++add product error+++', error)
    }
  }
  //:::

  //::: handle images posting
  const handleUploadImages = async (e) => {
    setImages((prev) => [...prev, ...e.target.files])
    let imagesList = e.target.files
    console.log('images list ', imagesList)

    const formData = new FormData()
    for (let i = 0; i < imagesList.length; i++) {
      lengthRef.current++
      formData.append('image', imagesList[i])
      formData.append('product_id', id)
      try {
        setFreezeOnUploading(true)
        const res = await AXIOS.post(`/product-img/add`, formData, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent
            let percent = Math.floor(loaded / total * 100)
            if (percent % 10 === 0) {
              progressRef.current[lengthRef.current].style.width = `${percent}%`
              progressRef.current[lengthRef.current].setAttribute('percent', percent)
            }
          }
        })
        console.log('uploads of images>>>>>>>>>>>', res)
        // lengthRef.current++
        setFreezeOnUploading(false)
        // idsRef.current[lengthRef.current - 1] = res?.data?.id
        idsRef.current[lengthRef.current] = res?.data?.id
        console.log(idsRef.current)
      } catch (error) {
        console.log('images error', error)
      }
    }
  }
  console.log('lengthRef', lengthRef)
  //:::

  //::: handle inputs changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }
  console.log(form)
  //:::

  //::: remove product image
  const removeImage = async (img, id) => {
    const findId = idsRef.current[id]
    console.log('index', id, 'imageid', findId)
    try {
      const res = await AXIOS.delete('product-img/' + findId)
      setImages((prev) => prev.filter((image) => image !== img))
      idsRef.current = idsRef.current.filter((i) => i !== findId)
      lengthRef.current--
    } catch (error) {
      console.log('+++remove image error+++', error)
    }
  }
  console.log('||||||||||||||||||||||||', lengthRef)
  //:::

  //:::
  const removeImageFromServer = async (e) => {
    let id = e
    setImagesFromServer((prev) => prev.filter((img) => img.id !== id));
    setImagesFromServerIds((prev) => [...prev, id])
  }
  //:::

  /**
  *! :::::::::::::::::::::::::::::::::::::::::::::::::::::
  *! FUNCTIONS END  ::::::::::::::::::::::::::::::::::::::
  *! :::::::::::::::::::::::::::::::::::::::::::::::::::::
 */

  //:::
  const showImages = images.map((img, index) =>
    <div key={index} className='d-flex flex-column gap-2 border rounded border-gray p-2'>
      <div className='d-flex flex-row gap-3'>
        <img src={URL.createObjectURL(img)} width='100' height='auto' className='rounded' />
        <div className='d-flex flex-column w-100'>
          <p className='mb-2 font-weight-bold'>{shortText(img?.name, 30)}</p>
          <small>{getFileSize(img?.size)}</small>
        </div>
        <Button variant='danger' size='sm' style={{ height: '100%' }} onClick={() => removeImage(img, index)}>
          <FontAwesomeIcon icon={faTrash} className='pointer' />
        </Button>
      </div>
      <div className="upload-image-progress rounded">
        <span
          className="inner-upload-image-progress"
          ref={(e) => (progressRef.current[index] = e)}
        // ref={(e) => (progressRef.current = [...progressRef.current, e])}
        >
        </span>
      </div>
    </div>
  )
  //:::


  //::: showing the product images from server
  const showImagesFromServer = imagesFromServer?.map((img) =>
    <div key={img?.id} className='d-flex flex-column gap-2 border rounded border-gray p-2' style={{ width: '100px' }}>
      <div className='d-flex flex-column gap-2'>
        <img src={img?.image} width='100%' height='auto' className='rounded' title={new Date(img?.created_at).toLocaleDateString() + ' - ' + new Date(img?.created_at).toLocaleTimeString()} />
        <div className='d-flex flex-column w-100'>
          <small style={{ fontSize: '10px' }}>{new Date(img?.created_at).toLocaleDateString() + ' - ' + new Date(img?.created_at).toLocaleTimeString()}</small>
        </div>
        <Button variant='danger' size='sm' style={{ height: '100%' }} onClick={() => removeImageFromServer(img?.id)}>
          <FontAwesomeIcon icon={faTrash} className='pointer' />
        </Button>
      </div>

    </div>
  )
  //:::

  return (
    <div>
      <div className="form-container form-noimage">
        <div className="form-box">
          <Form onSubmit={Submit}>
            <Form.Group className="mb-4 input-container">
              <Form.Select type='text' id="category" name='category' placeholder=""
                value={form?.category} onChange={handleChange} required>
                <option disabled>Select Category</option>
                {showCategories}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4 input-container">
              <Form.Control type='text' id="title" name='title' placeholder=""
                value={form?.title} onChange={handleChange} required />
              <Form.Label htmlFor="name">Title</Form.Label>
            </Form.Group>

            <Form.Group className="mb-4 input-container">
              <Form.Control type='text' id="description" name='description' placeholder=""
                value={form?.description} onChange={handleChange} required />
              <Form.Label htmlFor="name">Description</Form.Label>
            </Form.Group>

            <Form.Group className="mb-4 input-container">
              <Form.Control type='number' id="price" name='price' placeholder=""
                value={form?.price} onChange={handleChange} required />
              <Form.Label htmlFor="name">Price</Form.Label>
            </Form.Group>

            <Form.Group className="mb-4 input-container">
              <Form.Control type='number' id="discount" name='discount' placeholder=""
                value={form?.discount} onChange={handleChange} required />
              <Form.Label htmlFor="name">Discount</Form.Label>
            </Form.Group>

            <Form.Group className="mb-4 input-container">
              <Form.Control type='t ext' id="about" name='about' placeholder=""
                value={form?.About} onChange={handleChange} required />
              <Form.Label htmlFor="name">About</Form.Label>
            </Form.Group>
          </Form>
          <div>
            <small className='flex-1' style={{ fontSize: '12px' }}>{product?.images?.length} images</small>
            {
              <div className='d-flex gap-1'>
                {showImagesFromServer}
              </div>
            }
          </div>
          <Form.Group className="mb-4 input-container">
            <Form.Control type='file' id="images" name='images'
              onChange={(e) => handleUploadImages(e)}
              multiple
              required
              disabled={freezeOnUploading}
              ref={selectFileRef}
              hidden />
          </Form.Group>

          <div
            className={!freezeOnUploading && !isLoading ? 'upload-image' : freezeOnUploading ? 'uploading-upload-image' : 'inactive-upload-image'}
            onClick={() => selectFileRef.current.click()}
            title={
              freezeOnUploading
                ? 'please wait till the uploading precess complete'
                : !freezeOnUploading ? 'Choose the category first'
                  : 'upload you images'
            }
          >
            <FontAwesomeIcon icon={faFileUpload} size='2xl' className='fa-light' />
            <p>
              {
                freezeOnUploading
                  ? 'Your images are uploading....'
                  : 'Upload the images from this section'
              }</p>
          </div>
          <div className='d-flex flex-column gap-4 mb-4'>
            {showImages}
          </div>

          <Button variant="primary" size="sm" type="submit" onClick={Submit} disabled={isLoading || freezeOnUploading}>
            {
              isLoading
                ? 'Adding Product...'
                : 'Add Product'
            }
          </Button>
          <AlertMsg message={success?.message || error?.message} isError={isError} delay='3000' isMsg={isMsg} setIsMsg={setIsMsg} />

        </div>
      </div>

    </div >
  )
}

export default Product