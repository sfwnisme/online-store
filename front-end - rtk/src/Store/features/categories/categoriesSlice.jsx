import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AXIOS } from '../../../Api/AXIOS.JSX'
import { CAT, CATS } from '../../../Api/API'
import usePathname from '../../../Hooks/use-pathname'
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
  singleData: {
    data: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    isEmpty: false,
    success: null,
    error: null,
  },
  updateData: {
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

//::: get categories
export const getCategories = createAsyncThunk('categories/getCategories', async (_, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.get(`/${CATS}`)
    const customRes = res?.data
    return fulfillWithValue(customRes)
  } catch (error) {
    // const customError = error?.response?.data
    const customError = storeErrorHandler(error)
    return rejectWithValue(customError)
  }
})
//:::

//:::
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.delete(`/${CAT}/${id}`)
    const customRes = { id: id, message: 'The User has been successfully deleted' }
    return fulfillWithValue(customRes)
  } catch (error) {
    console.log('+++++++', error)
    // if you did not return the error value .unwrap() will not wrok
    // const customError = { message: error.response.data.message, status: error.response.status }
    const customError = storeErrorHandler(error)
    return rejectWithValue(customError)
  }
})
//:::

//:::
export const getSingleCategory = createAsyncThunk('categories/currentCategory', async (_, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  const { id } = usePathname()
  try {
    const res = await AXIOS.get(`/${CAT}/${id}`)
    const customRes = res?.data
    return fulfillWithValue(customRes)
  } catch (error) {
    // const customError = error?.response?.data
    const customError = storeErrorHandler(error)
    return rejectWithValue(customError)
  }
})
//:::

//::: update category
export const updateCategory = createAsyncThunk('categories/updaetCategory', async (initialData, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  const { id } = usePathname()
  try {
    await AXIOS.post(`${CAT}/edit/${id}`, initialData)
    const customRes = { id: initialData?.id, message: 'The category has been successfully updated' }
    return fulfillWithValue(customRes)
  } catch (error) {
    // const customError = {
    //   message: error?.response?.data?.message,
    //   status: error?.response?.data?.message
    // }
    const customError = storeErrorHandler(error)
    return rejectWithValue(customError)
  }
})
//:::

//::: add category
export const addCategory = createAsyncThunk('categories/addCategory', async (initialData, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.post(`/${CAT}/add`, initialData)
    const customRes = { message: 'The category has been successfully added', status: res?.status }
    return fulfillWithValue(customRes)
  } catch (error) {
    // const customError = {
    //   message: error?.response?.data?.message,
    //   status: error?.response?.status
    // }
    const customError = storeErrorHandler(error)
    console.log(customError)
    return rejectWithValue(customError)
  }
})
//:::



const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.isEmpty = false
        state.success = null
        state.error = null
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.isEmpty = payload?.length === 0 ? true : false
        state.success = { message: 'The categories has been successfully called' }
        state.error = null
        state.data = payload
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = true
        state.success = null
        state.error = payload
      })
      //::: delete user
      .addCase(deleteCategory.pending, (state) => {
        state.deleteData.isLoading = true
        state.deleteData.isSuccess = false
        state.deleteData.isError = false
        state.deleteData.error = null
        state.deleteData.success = null
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.deleteData.isLoading = false
        state.deleteData.isSuccess = true
        state.deleteData.isError = false
        state.deleteData.success = payload
        state.deleteData.error = null
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.deleteData.isLoading = false
        state.deleteData.isSuccess = false
        state.deleteData.isError = true
        state.deleteData.success = null
        state.deleteData.error = payload
        console.log(payload)
      })
      //:::get single category
      .addCase(getSingleCategory.pending, (state) => {
        state.singleData.data = {}
        state.singleData.isLoading = true
        state.singleData.isSuccess = false
        state.singleData.isError = false
        state.singleData.isEmpty = false
        state.singleData.success = null
        state.singleData.error = null
      })
      .addCase(getSingleCategory.fulfilled, (state, { payload }) => {
        state.singleData.data = payload
        state.singleData.isLoading = false
        state.singleData.isSuccess = true
        state.singleData.isError = false
        state.singleData.isEmpty = payload ? false : true
        state.singleData.success = { message: 'The category has been successfully called' }
        state.singleData.error = null
      })
      .addCase(getSingleCategory.rejected, (state, { payload }) => {
        state.singleData.data = {}
        state.singleData.isLoading = true
        state.singleData.isSuccess = false
        state.singleData.isError = false
        state.singleData.isEmpty = false
        state.singleData.success = false
        state.singleData.error = payload
      })
      //::: update category
      .addCase(updateCategory.pending, (state) => {
        state.updateData.isLoading = true
        state.updateData.isSuccess = false
        state.updateData.isError = false
        state.updateData.success = null
        state.updateData.error = null
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        state.updateData.isLoading = false
        state.updateData.isSuccess = true
        state.updateData.isError = false
        state.updateData.success = payload
        console.log(payload)
        state.updateData.error = null
      })
      .addCase(updateCategory.rejected, (state, { payload }) => {
        state.updateData.isLoading = false
        state.updateData.isSuccess = false
        state.updateData.isError = true
        state.updateData.success = null
        state.updateData.error = payload
        console.log(payload)
      })
      //::: add category
      .addCase(addCategory.pending, (state) => {
        state.addData.data = {}
        state.addData.isLoading = true
        state.addData.isSuccess = false
        state.addData.isError = false
        state.addData.isEmpty = false
        state.addData.success = null
        state.addData.error = null
      })
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.addData.data = payload
        state.addData.isLoading = false
        state.addData.isSuccess = true
        state.addData.isError = false
        state.addData.isEmpty = payload ? false : true
        state.addData.success = payload
        state.addData.error = null
      })
      .addCase(addCategory.rejected, (state, { payload }) => {
        state.addData.data = {}
        state.addData.isLoading = false
        state.addData.isSuccess = false
        state.addData.isError = true
        state.addData.isEmpty = false
        state.addData.success = null
        state.addData.error = payload
        console.log(payload)
      })
  }
})

export default categoriesSlice.reducer
export const categoriesSelector = (state) => state.categories
export const deleteCategorySelector = (state) => state.categories.deleteData
export const singleCategorySelector = (state) => state.categories.singleData
export const updateCategorySelector = (state) => state.categories.updateData
export const addCategorySelector = (state) => state.categories.addData