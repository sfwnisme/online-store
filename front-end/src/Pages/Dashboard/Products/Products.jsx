import TableShow from '../../../Components/TableShow'
import { deleteProduct, deleteProductSelector, getProducts, productsSelector } from '../../../Store/features/products/productsSlice'

const Products = () => {
  //:::
  const header = [
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
      />
    </div>
  )
}

export default Products


