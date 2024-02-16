// import { NavLink } from 'react-router-dom';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import Logout from '../Pages/Auth/Logout';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Cookie from 'cookie-universal';
import getUserType from '../utils/getUserType';
import { useEffect } from 'react';
import { currentUserSelector, getCurrentUser } from '../Store/features/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
const Header = () => {
  //:::
  const cookie = Cookie()
  let token = cookie.get('e-commerce')
  // const [isToken, setIsToken] = useState(token)

  const dispatch = useDispatch()
  const { data: currentUser, isLoading, isEmpty, isError, error } = useSelector(currentUserSelector)
  useEffect(() => {
    token
      ? dispatch(getCurrentUser())
      : null
  }, [dispatch, token])
  //:::

  return (
    <header>
      <Navbar expand="lg" className="">
        <Container fluid>
          <Navbar.Brand style={{ display: 'flex' }} >
            SFWN
            <span> </span>
            {
              token &&
              <DropdownButton
                size='sm'
                title={`${getUserType(currentUser?.role) || 'loading...'} - ${currentUser && currentUser?.name || isLoading && "Loading..." || isEmpty && 'undefined' || isError && 'there is an error'}`}
              >
                <Dropdown.Item size='sm'>
                  <Logout />
                </Dropdown.Item>
              </DropdownButton>
            }
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Item>
                <NavLink className='nav-link' to="/">
                  Home
                </NavLink>
              </Nav.Item>
            </Nav>
            <ButtonGroup>
              <Button variant='outline-secondary' size='sm'>
                <NavLink className='nav-link' to="/dashboard">
                  Dashboard
                </NavLink>
              </Button >
              {
                token
                  ?
                  <>
                  </>
                  :
                  <>
                    <Button variant='primary' size='sm'>
                      <NavLink className='nav-link' to="/login">
                        Login
                      </NavLink>
                    </Button>
                    <Button variant='primary' size='sm'>
                      <NavLink className='nav-link' to="/register">
                        Register
                      </NavLink>
                    </Button>
                  </>
              }
            </ButtonGroup>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header >

  );
}

export default Header;