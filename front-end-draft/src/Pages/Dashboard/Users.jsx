import { USER, USERS } from "../../Api/API"
import TableShow from "../../Components/TableShow.jsx";
import useSignedUser from "../../Hooks/use-signed-user.jsx"
import useGetData from "../../Hooks/use-get-data.jsx"

const Users = () => {
    //:::usnig this hook instead of fetching data inside the component
    const { currentUser } = useSignedUser()
    //:::

    //:::
    const { data: users, setRefreshData } = useGetData(USERS)
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
                dataEndpoint={USERS}
                deleteEndpoint={USER}
                currentUser={currentUser}
                title='Users'
                addTitle="Add User"
                addLink='/dashboard/user/add'
            />
        </div>
    )
}

export default Users