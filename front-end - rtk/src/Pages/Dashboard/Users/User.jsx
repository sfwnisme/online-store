import { useEffect, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import usePathname from '../../../Hooks/use-pathname'
import { useDispatch, useSelector } from 'react-redux'
import { getSigleUser, singleUserSelector, updateUser, updateUserSelector } from '../../../Store/features/users/usersSlice'
import AlertMsg from '../../../Components/AlertMsg'

const User = () => {
    //:::
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [isMsg, setIsMsg] = useState(false)
    const focusRef = useRef(null)
    const { id } = usePathname()
    //:::

    //::: focus on the name input after render
    useEffect(() => {
        focusRef.current.focus()
    }, [])
    //:::

    //:::
    const dispatch = useDispatch()
    const { data: singleUser } = useSelector(singleUserSelector)

    useEffect(() => {
        dispatch(getSigleUser())
    }, [dispatch])

    useEffect(() => {
        setName(singleUser?.name)
        setEmail(singleUser?.email)
        setRole(singleUser?.role)
    }, [singleUser])
    //:::

    //:::
    const { isLoading, isSuccess, isError, success, error } = useSelector(updateUserSelector)
    const Submit = async (e) => {
        e.preventDefault()
        const initialData = { id, name, email, role }
        try {
            const res = await dispatch(updateUser(initialData)).unwrap()
            window.location.pathname = '/dashboard/users'
            setIsMsg(true)
        } catch (error) {
            setIsMsg(true)
            console.log('+++update user erro+++', error)
        }
    }
    //:::

    return (
        <div>
            <div className='form-container form-noimage'>
                <div className='form-box'>
                    <h1>Update User - {name}</h1>
                    <Form onSubmit={Submit}>
                        <Form.Group className="mb-4 input-container">
                            <Form.Control ref={focusRef} type='text' id="name" name='name' placeholder="" value={name} onChange={(e) => setName(e.target.value)} required />
                            <Form.Label htmlFor="email">Name</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-4 input-container">
                            <Form.Control type='email' id="email" name='email' placeholder="" value={email}
                                onChange={(e) => setEmail(e.target.value)} required />
                            <Form.Label htmlFor="password">Email</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-4 input-container">
                            <Form.Select id="role" value={role} name='role' onChange={(e) => setRole(e.target.value)}>
                                <option value="" disabled>select role</option>
                                <option value="1995">admin</option>
                                <option value="2001">user</option>
                                <option value="1999">product manager</option>
                                <option value="1996">writer</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" size="sm" type="submit" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update'}
                        </Button>
                    </Form>
                </div>
            </div>
            <AlertMsg message={success?.message || error?.message} delay='2000' isError={isError} isMsg={isMsg} setIsMsg={setIsMsg} />
        </div>
    )

}

export default User