import { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { addUser, addUserSelector } from '../../../Store/features/users/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import AlertMsg from '../../../Components/AlertMsg'

const AddUser = () => {
    //:::
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    })
    const [isMsg, setIsMsg] = useState(false)
    //:::

    //:::
    const nameRef = useRef(null)
    useEffect(() => {
        nameRef.current.focus()
    }, [])
    //:::

    //:::
    const { isLoading, isError, success, error } = useSelector(addUserSelector)
    const dispatch = useDispatch()
    const Submit = async (e) => {
        e.preventDefault()
        const initialData = form
        try {
            const res = await dispatch(addUser(initialData)).unwrap()
            window.location.pathname = '/dashboard/users'
            setIsMsg(true)
        } catch (error) {
            setIsMsg(true)
            console.log('+++add user error+++', error)
        }
    }
    //:::

    //:::
    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setForm((prev) => ({ ...prev, [name]: value }))
    }
    //:::

    return (
        <div>
            <div className='form-container form-noimage'>
                <div className='form-box'>
                    <h1>Add User</h1>
                    <Form onSubmit={Submit}>
                        <Form.Group className="mb-4 input-container">
                            <Form.Control ref={nameRef} type='text' id="name" name='name' placeholder=""
                                value={form.name} onChange={handleChange} required />
                            <Form.Label htmlFor="name">Name</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-4 input-container">
                            <Form.Control type='email' id="email" name='email' placeholder="" value={form.email}
                                onChange={handleChange} required />
                            <Form.Label htmlFor="email">Email</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-4 input-container">
                            <Form.Control type='password' id="password" name='password' placeholder=""
                                value={form.password} onChange={handleChange} required />
                            <Form.Label htmlFor="password">Password</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-4 input-container">
                            {/* <Form.Label htmlFor="role">Role</Form.Label> */}
                            <Form.Select id="role" value={form.role} name='role' onChange={handleChange}>
                                <option value="" disabled>select role</option>
                                <option value="1995">admin</option>
                                <option value="2001">user</option>
                                <option value="1999">product manager</option>
                                <option value="1996">writer</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" size="sm" type="submit" disabled={isLoading}>
                            {
                                isLoading
                                    ? 'Adding...'
                                    : 'Add'
                            }
                        </Button>
                    </Form>
                </div>
            </div>
            <AlertMsg message={success?.message || error?.message} isError={isError} delay='3000' isMsg={isMsg} setIsMsg={setIsMsg} />
        </div>
    )
}

export default AddUser