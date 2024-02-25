import { useEffect, useState } from "react";
import TableShow from "../../../Components/TableShow.jsx";
import { categoriesSelector, deleteCategory, deleteCategorySelector, getCategories } from "../../../Store/features/categories/categoriesSlice.jsx";
import Pagination from "../../../Components/pagination/Pagination.jsx";
import { CAT, CATS } from "../../../Api/API.jsx";
import { AXIOS } from "../../../Api/AXIOS.JSX";
import { useQuery } from '@tanstack/react-query'

const Categories = () => {
    //:::
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(30)
    //:::

    //::: tab title
    useEffect(() => {
        document.title = 'Categories'
    }, [])
    //:::

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
                DISPATCHER={getCategories}
                SELECTOR={categoriesSelector}
                DELETEACTION={deleteCategory}
                DELETESELECTOR={deleteCategorySelector}
                title='Categories'
                addTitle='Add Category'
                addLink='/dashboard/category/add'
                // pagination
                limit={limit}
                setLimit={setLimit}
                page={page}
                setPage={setPage}
                ENDPOINT={CATS}
            />
        </div>
    )
}

export default Categories