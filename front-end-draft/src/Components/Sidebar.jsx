import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';
import { USER } from '../Api/API';
import { AXIOS } from '../Api/AXIOS.JSX';
import { links } from '../Pages/Dashboard/NavLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
    //:::
    const [user, setUser] = useState({})
    //:::

    //:::
    useEffect(() => {
        AXIOS.get(`/${USER}`).then((data) => {
            setUser(data.data)
            console.log(':::get user from sidebar done:::', data)
        }).catch((error) => {
            console.log('+++get user from sidebar error+++', error)
        })
    }, [])
    //:::

    //::: sidebar links
    const linksList = links.map((link) =>
        link.role.includes(user?.role) &&
        <ListGroup.Item key={link?.id}>
            <NavLink to={link.path}>
                <FontAwesomeIcon icon={link?.icon} color='var(--main-color)' size='sm' style={{ marginRight: "10px" }} />
                {link.name}
            </NavLink>
        </ListGroup.Item>
    )
    //:::

    return (
        <aside>
            <ListGroup>
                {linksList}
            </ListGroup>
        </aside>
    )
}

export default Sidebar