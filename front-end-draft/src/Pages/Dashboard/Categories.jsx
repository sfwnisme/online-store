import TableShow from "../../Components/TableShow.jsx";
import { CAT, CATS } from "../../Api/API.jsx";

const Categories = () => {
    //:::
    let header = [
        {
            key: 'id',
            name: 'id'
        },
        {
            key: 'title',
            name: 'title'
        },
        {
            key: 'image',
            name: 'image'
        }
    ]
    //:::

    return (
        <div>
            <TableShow
                header={header}
                dataEndpoint={CATS}
                deleteEndpoint={CAT}
                title='Categories'
                addTitle='Add Category'
                addLink='/dashboard/category/add'
            />
        </div>
    )
}

export default Categories