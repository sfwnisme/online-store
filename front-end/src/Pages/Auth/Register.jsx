import { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PageLoading from '../../Loading/PageLoading/PageLoading';
import { NavLink } from 'react-router-dom';
import GoogleBtn from '../../Components/GoogleBtn';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, registerUserSelector } from '../../Store/features/auth/registerSlice';
import AlertMsg from '../../Components/AlertMsg';

const Register = () => {
  //:::States
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [isMsg, setIsMsg] = useState(false)
  //:::

  //:::
  let srcImage = 'https://res.cloudinary.com/daa68wahe/image/upload/v1704753697/e-commerce/xlqwax2gmakopolkvf3z.png'
  //:::

  //:::handle form change
  const handleChange = useCallback((e) => {
    const value = e.target.value
    const state = e.target.name
    setForm((prev) => ({ ...prev, [state]: value }))
  }, [])
  //:::

  //:::
  const { isLoading, isSuccess, isError, success, error } = useSelector(registerUserSelector)
  //:::

  //:::
  const dispatch = useDispatch()
  const Submit = async (e) => {
    e.preventDefault()
    try {
      const res = await dispatch(registerUser(form)).unwrap()
      setIsMsg(true)
      location.pathname = '/'
    } catch (error) {
      setIsMsg(true)
    }
  }
  //:::

  return (
    <div>
      {isLoading && <PageLoading />}
      <div className='form-container'>
        <div className='form-box'>
          <h1>Register</h1>
          <Form onSubmit={Submit}>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='text' id="name" placeholder="" name='name' value={form.name} onChange={handleChange} required minLength='4' />
              <Form.Label htmlFor="name">Name</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='email' id="email" placeholder="" name='email' value={form.email} onChange={handleChange} required />
              <Form.Label htmlFor="email">Email</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='password' id="password" placeholder="" name='password' value={form.password} onChange={handleChange} required minLength='6' />
              <Form.Label htmlFor="password">Password</Form.Label>
            </Form.Group>
            <Button variant='primary' size='sm' type="submit" disabled={isLoading} >
              {
                isLoading
                  ? 'Join...'
                  : 'Join us'
              }
            </Button>
            <NavLink to='/login'>
              <Button variant="link" size="sm">already have an account</Button>
            </NavLink>
          </Form>
          <GoogleBtn />
          <AlertMsg message={success?.message || error?.message} isError={isError} delay='3000' isMsg={isMsg} setIsMsg={setIsMsg} />
        </div>
        <div className="credential-image-container">
          <img src={srcImage} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Register