import { useSelector } from "react-redux";
import TableShow from "../../../Components/TableShow.jsx";
// import useSignedUser from "../../Hooks/use-signed-user.jsx"
import { currentUserSelector, deleteUser, deleteUserSelector, getUsers, usersSelector } from "../../../Store/features/users/usersSlice.jsx";

const Users = () => {
    //:::usnig this hook instead of fetching data inside the component
    // const { currentUser } = useSignedUser()
    const { data: currentUser } = useSelector(currentUserSelector)
    //:::

    //:::
    const header = [
        {
            key: 'id',
            name: 'id',
        },
        {
            key: 'name',
            name: 'name',
        },
        {
            key: 'email',
            name: 'email',
        },
        {
            key: 'role',
            name: 'role',
        },
    ]
    //:::

    return (
        <div>
            <TableShow
                header={header}
                SELECTOR={usersSelector}
                DISPATCHER={getUsers}
                DELETESELECTOR={deleteUserSelector}
                DELETEACTION={deleteUser}
                currentUser={currentUser}
                title='Users'
                addTitle="Add User"
                addLink='/dashboard/user/add'
            />
        </div>
    )
}

export default Users