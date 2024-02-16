import { PRO, PROS } from '../../Api/API'
import TableShow from '../../Components/TableShow'

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
        dataEndpoint={PROS}
        deleteEndpoint={PRO}
        title='Products'
        addLink="/dashboard/product/add"
        addTitle="Add product"
      />
    </div>
  )
}

export default Products


