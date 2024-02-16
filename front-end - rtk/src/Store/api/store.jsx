import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../features/auth/authSlice'
import UsersReducer from '../features/users/usersSlice'
import CategoriesReducer from '../features/categories/categoriesSlice'
import ProductsReducer from '../features/products/productsSlice'
import RegisterUserReducer from '../features/auth/registerSlice'
import LoginUserReducer from '../features/auth/loginSlice'
import LogoutReducer from '../features/auth/logoutSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    register: RegisterUserReducer,
    login: LoginUserReducer,
    logout: LogoutReducer,
    users: UsersReducer,
    categories: CategoriesReducer,
    products: ProductsReducer,
  },
  devTools: true
})