import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';
import { links } from '../Pages/Dashboard/NavLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../Store/features/users/usersSlice';

const Sidebar = () => {
    //:::
    const { data: user } = useSelector(currentUserSelector)
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