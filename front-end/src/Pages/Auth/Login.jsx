import { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import PageLoading from "../../Loading/PageLoading/PageLoading"
import { NavLink } from "react-router-dom"
import GoogleBtn from "../../Components/GoogleBtn"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, loginUserSelector } from "../../Store/features/auth/loginSlice"
import AlertMsg from "../../Components/AlertMsg"

const Login = () => {

  //:::states
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [isMsg, setIsMsg] = useState(false)
  //:::

  //:::
  const srcImage = 'https://res.cloudinary.com/daa68wahe/image/upload/v1704753751/e-commerce/rzwx5ubf9mhycavoqxsj.png'
  //:::

  //:::
  const handleChange = (e) => {
    const state = e.target.name
    const { value } = e.target
    setForm((prev) => ({ ...prev, [state]: value }))
  }
  //:::

  //:::
  const { isLoading, isSuccess, isError, success, error } = useSelector(loginUserSelector)
  //:::

  //:::
  const dispatch = useDispatch()
  const Submit = async (e) => {
    e.preventDefault()
    try {
      const res = await dispatch(loginUser(form)).unwrap()
      setIsMsg(true)
      const role = res?.user?.role
      const go = role === '1995' ? '/dashboard/users' : role === '1996' ? '/dashboard/writer' : '/'
      switch (role) {
        case '1995':
          'dashboard/users';
          break;
        case '1996':
          'dashboard/writer';
          break;
        case '1999':
          'dashboard/products';
          break;
        default:
          '/';
          break;
      }
      location.pathname = go
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
          <h1>Login</h1>
          <Form onSubmit={Submit}>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='email' id="email" name='email' placeholder="" value={form.email} onChange={handleChange} required />
              <Form.Label htmlFor="email">Email</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='password' id="password" name='password' placeholder="" value={form.password} onChange={handleChange} required minLength='6' />
              <Form.Label htmlFor="password">Password</Form.Label>
            </Form.Group>
            <Button variant="primary" size="sm" type="submit" disabled={isLoading}>
              {
                isLoading
                  ? 'Get...'
                  : 'Get in'
              }
            </Button>
            <NavLink to='/register' style={{ pointerEvents: isLoading ? 'none' : '' }}>
              <Button variant="link" size="sm">have not account</Button>
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

export default Login