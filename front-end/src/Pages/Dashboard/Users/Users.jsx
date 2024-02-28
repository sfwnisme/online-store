import { useSelector } from "react-redux";
import TableShow from "../../../Components/TableShow.jsx";
// import useSignedUser from "../../Hooks/use-signed-user.jsx"
import { currentUserSelector, deleteUser, deleteUserSelector, getUsers, usersSelector } from "../../../Store/features/users/usersSlice.jsx";
import { useState } from "react";
import { USERS } from "../../../Api/API.jsx";

const Users = () => {
    //:::usnig this hook instead of fetching data inside the component
    // const { currentUser } = useSignedUser()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(3)
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
                //pagination
                limit={limit}
                setLimit={setLimit}
                page={page}
                setPage={setPage}
                ENDPOINT={USERS}
            />
        </div>
    )
}

export default Users