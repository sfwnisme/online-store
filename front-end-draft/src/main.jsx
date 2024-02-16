import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './Pages/Website/HomePage.jsx'
import Login from './Pages/Auth/Login.jsx'
import Register from './Pages/Auth/Register.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './Pages/Dashboard/Users.jsx'
import GoogleCallBack from './Pages/Auth/GoogleCallBack.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import RequireAuth from './Pages/Auth/RequireAuth.jsx'
import User from './Pages/Dashboard/User.jsx'
import AddUser from './Pages/Dashboard/AddUser.jsx'
import Writer from './Pages/Dashboard/Writer.jsx'
import Err404 from './Pages/Auth/Err404.jsx'
import RequireBack from './Pages/Auth/RequireBack.jsx'
import Categories from "./Pages/Dashboard/Categories.jsx";
import Welcome from "./Pages/Dashboard/Welcome.jsx";
import AddCategory from './Pages/Dashboard/AddCategory.jsx'
import Category from './Pages/Dashboard/Category.jsx'
import Products from './Pages/Dashboard/Products.jsx'
import AddProduct from './Pages/Dashboard/AddProduct.jsx'

//::: users codes
const admin = ['1995']
const productManager = ['1999']
const writer = ['1996']
// const user = ['2001']
const adminAllowed = [...admin, ...writer, ...productManager]
const productManagerAllowed = [...admin, ...productManager]
const writerAllowed = [...admin, ...writer]
console.log(adminAllowed)
//:::

const router = createBrowserRouter([
    {
        element: <App />,
        path: '/',
        errorElement: <Err404 />,
        children: [
            {
                element: <HomePage />,
                index: true,

            },
            {
                element: <RequireBack />,
                children: [
                    {
                        element: <Login />,
                        path: 'login',
                    },
                    {
                        element: <Register />,
                        path: 'register',
                    },
                ]
            },

            {
                element: <RequireAuth allowedRole={adminAllowed} />,
                children: [
                    {
                        path: 'dashboard',
                        element: <Dashboard />,
                        children: [
                            {
                                element: <Welcome />,
                                index: true,
                            },
                            {
                                element: <RequireAuth allowedRole={writerAllowed} />,
                                children: [
                                    {
                                        element: <Users />,
                                        path: 'users'
                                    },
                                    {
                                        element: <User />,
                                        path: 'users/:id',
                                    },
                                    {
                                        element: <AddUser />,
                                        path: 'user/add'
                                    }
                                ]
                            },
                            {
                                element: <RequireAuth allowedRole={productManagerAllowed} />,
                                children: [
                                    //::: categories
                                    {
                                        element: <Categories />,
                                        path: 'categories'
                                    },
                                    {
                                        element: <Category />,
                                        path: 'categories/:id'
                                    },
                                    {
                                        element: <AddCategory />,
                                        path: 'category/add'
                                    },
                                    //::: products
                                    {
                                        element: <Products />,
                                        path: 'products',
                                    },
                                    {
                                        element: <AddProduct />,
                                        path: 'product/add'
                                    }
                                ]
                            },
                            {
                                element: <RequireAuth allowedRole={writerAllowed} />,
                                children: [
                                    {
                                        element: <Writer />,
                                        path: 'writer'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                element: <GoogleCallBack />,
                path: '/auth/google/callback'
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <RouterProvider router={router} />
    // </React.StrictMode>,
)
