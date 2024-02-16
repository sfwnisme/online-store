import { useEffect, useRef } from 'react'
import { AXIOS } from '../../Api/AXIOS.JSX'
import { USER } from '../../Api/API'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import usePathname from '../../Hooks/use-pathname'
import useSingleUser from '../../Hooks/use-single-user'

const User = () => {
    //:::
    const focusRef = useRef(null)
    //:::

    //:::get the user id | you can also using useParams() from react-router-dom
    const { id } = usePathname()
    //:::

    //::: focus on the name input after render
    useEffect(() => {
        focusRef.current.focus()
    }, [])
    //:::

    //::: get the user data using custom hook make clean code
    const {
        setName,
        name,
        setEmail,
        email,
        setRole,
        role,
        setDisable,
        disable
    } = useSingleUser()

    //:::
    const Submit = async (e) => {
        e.preventDefault()
        setDisable(true)
        try {
            const res = await AXIOS.post(`${USER}/edit/${id}`, {
                name,
                email,
                role
            })
            setDisable(false)
            window.location.pathname = '/dashboard/users'
            console.log(':::edit user done:::', res)
        } catch (error) {
            setDisable(false)
            console.log('+++edit user error+++', error)
        } finally {
            setDisable(false)
        }
    }
    //:::

    return (
        <div>
            <div className='form-container form-noimage'>
                <div className='form-box'>
                    <h1>Update User [{id}]</h1>
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
                        <Button variant="primary" size="sm" type="submit" disabled={disable}>
                            {disable ? 'Updating...' : 'Update'}
                        </Button>
                    </Form>
                </div>

            </div>
        </div>
    )
}

export default User