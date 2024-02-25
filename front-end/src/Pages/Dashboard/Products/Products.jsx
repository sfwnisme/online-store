import { useState } from 'react'
import TableShow from '../../../Components/TableShow'
import { deleteProduct, deleteProductSelector, getProducts, productsSelector } from '../../../Store/features/products/productsSlice'
import { PROS } from '../../../Api/API'

const Products = () => {
  //:::
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  //:::



  //:::
  const header = [
    {
      key: 'images',
      name: 'Images'
    },
    {
      key: 'title',
      name: 'Title',
    },
    {
      key: 'category',
      name: 'category',
    },
    {
      key: 'description',
      name: 'description',
    },
    {
      key: 'price',
      name: 'price',
    },
  ]
  //:::

  return (
    <div>
      <TableShow
        header={header}
        DISPATCHER={getProducts}
        SELECTOR={productsSelector}
        DELETEACTION={deleteProduct}
        DELETESELECTOR={deleteProductSelector}
        title='Products'
        addLink="/dashboard/product/add"
        addTitle="Add product"
        //pagination
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        ENDPOINT={PROS}
      />

    </div>
  )
}

export default Products


