import {Alert} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import getUserType from "../../utils/getUserType"

const Err403 = (props) => {
    //:::? props => using it for the path and details
    return (
        <div>
            <Alert variant="danger">
                <Alert.Heading>403 Forbeden you are not allowed</Alert.Heading>
            </Alert>
            <small>
                You are not allowed using this page. Back to <NavLink
                to={props?.role === '1996' ? '/dashboard/writer' : '/'}>{props?.role === '1996' ? getUserType(props?.role) : 'Home'} page</NavLink>
            </small>
        </div>
    )
}

export default Err403