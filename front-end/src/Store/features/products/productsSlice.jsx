import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AXIOS } from '../../../Api/AXIOS.JSX'
import { PRO, PROS } from '../../../Api/API'
import storeErrorHandler from '../../storeErrorHandler'

//:::
const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  isEmpty: false,
  success: null,
  error: null,
  deleteData: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    success: null,
    error: null,
  },
  addData: {
    data: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    isEmpty: false,
    success: null,
    error: null,
  },
}
//:::

//::: get products
export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.get(`/${PROS}`)
    const customRes = res?.data
    return fulfillWithValue(customRes)
  } catch (error) {
    // const customError = error?.response?.data
    const customError = storeErrorHandler(error)
    return rejectWithValue(customError)
  }
})
//:::

//::: delete product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI

  try {
    await AXIOS.delete(`/${PRO}/${id}`)
    const customRes = { id: id, message: 'The product has been successfully deleted' }
    return fulfillWithValue(customRes)
  } catch (error) {
    let custormError = { message: error.response.data.message, status: error.response.status }
    return rejectWithValue(custormError)
  }
})
//:::

//::: add product
export const addProduct = createAsyncThunk('categories/addProduct', async (initialData, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.post(`/${PRO}/add`, initialData)
    const customRes = { message: 'The product has been successfully added', status: res?.status }
    return fulfillWithValue(customRes)
  } catch (error) {
    const customError = {
      message: error?.response?.data?.message,
      status: error?.response?.status
    }
    return rejectWithValue(customError)
  }
})
//:::



//:::
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //::: get products
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.isEmpty = false
        state.success = null
        state.error = null
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.isEmpty = payload?.length === 0 ? true : false
        state.success = { message: 'The products has been successfully called' }
        state.error = null
        state.data = payload
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.success = null
        state.error = payload
      })
      //::: delete product
      .addCase(deleteProduct.pending, (state) => {
        state.deleteData.isLoading = true
        state.deleteData.isSuccess = false
        state.deleteData.isError = false
        state.deleteData.error = null
        state.deleteData.success = null
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.deleteData.isLoading = false
        state.deleteData.isSuccess = true
        state.deleteData.isError = false
        state.deleteData.success = payload
        state.deleteData.error = null
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.deleteData.isLoading = false
        state.deleteData.isSuccess = false
        state.deleteData.isError = true
        state.deleteData.success = null
        state.deleteData.error = payload
      })
      //::: add product
      .addCase(addProduct.pending, (state) => {
        state.addData.data = {}
        state.addData.isLoading = true
        state.addData.isSuccess = false
        state.addData.isError = false
        state.addData.isEmpty = false
        state.addData.success = null
        state.addData.error = null
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.addData.data = payload
        state.addData.isLoading = false
        state.addData.isSuccess = true
        state.addData.isError = false
        state.addData.isEmpty = payload ? false : true
        state.addData.success = payload
        state.addData.error = null
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.addData.data = {}
        state.addData.isLoading = false
        state.addData.isSuccess = false
        state.addData.isError = true
        state.addData.isEmpty = false
        state.addData.success = null
        state.addData.error = payload
      })
  }
})
//:::

export default productsSlice.reducer
export const productsSelector = (state) => state.products
export const deleteProductSelector = (state) => state.products.deleteData
export const addProductSelector = (state) => state.products.addData

