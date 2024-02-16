import { faBookOpenReader, faPlus, faLayerGroup, faUsers, faBox } from "@fortawesome/free-solid-svg-icons";

export const links = [
    {
        id: '1',
        name: 'Users',
        path: 'users',
        icon: faUsers,
        role: '1995'
    },
    {
        id: '2',
        name: 'Add User',
        path: '/dashboard/user/add',
        icon: faPlus,
        role: '1995'
    },
    {
        id: '3',
        name: 'Categories',
        path: '/dashboard/categories',
        icon: faLayerGroup,
        role: ['1995', '1999']
    },
    {
        id: '4',
        name: 'Add Category',
        path: '/dashboard/category/add',
        icon: faPlus,
        role: ['1995', '1999']
    },
    {
        id: '5',
        name: 'Products',
        path: '/dashboard/products',
        icon: faBox,
        role: ['1995', '1999']
    },
    {
        id: '6',
        name: 'Add Product',
        path: '/dashboard/product/add',
        icon: faPlus,
        role: ['1995', '1999']
    },
    {
        id: '40',
        name: 'Writer',
        path: '/dashboard/writer',
        icon: faBookOpenReader,
        role: ['1995', '1996']
    },
]

//NOTES
/*
link = {
  id: string,
  name: string || NavLink name,
  paht: strnig || NavLink path => to={path},
  icon: fontawesome icon,
  role: string || the user role 
}
*/