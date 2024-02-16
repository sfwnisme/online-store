import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AXIOS } from "../../../Api/AXIOS.JSX"
import { USER, USERS } from "../../../Api/API"
import usePathname from "../../../Hooks/use-pathname"
import storeErrorHandler from "../../storeErrorHandler"

//:::state
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
  updateData: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    success: null,
    error: null,
  },
  currentData: {
    data: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    isEmpty: false,
    success: null,
    error: null,
  },
  singleData: {
    data: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    isEmpty: false,
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
  DATA: {
    data: [],
    status: 'dle',// dle | loading | error | success
    msg: 'dle', // dle | error | success
  },
}
//:::

//::: get users 
export const getUsers = createAsyncThunk('users/getUsers', async (_, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.get(`/${USERS}`)
    console.log(':::get users rtk done:::', res)
    //to avoid facing non-serializable value error you
    //need to return the data from the response not the 
    //entire response, Because redux not accept non-serializable value
    //Conclusion: you should return a plain js object or array of data not the entire response
    //!DON'T DO ==> return res --> cause non-serialized value error
    //?DO ==> return res?.data --> serialized value
    const customRes = res?.data
    return fulfillWithValue(customRes)
    // return res.data
  } catch (error) {
    // const customError = error?.response?.data
    const customError = storeErrorHandler(error)
    console.log('error', customError)
    return rejectWithValue(customError)
  }
})
//::: 

//::: delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  try {
    await AXIOS.delete(`${USER}/${id}`)
    const customRes = { id: id, message: 'The user has been successfully deleted' }
    return fulfillWithValue(customRes)
  } catch (error) {
    // if you did not return the error value .unwrap() will not wrok
    const customError = storeErrorHandler(error)
    return rejectWithValue(customError)
  }
})
//::: 

//::: update user
export const updateUser = createAsyncThunk('users/updateUser', async (initialData, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  const { id } = usePathname()
  try {
    await AXIOS.post(`${USER}/edit/${id}`, initialData)
    const customRes = { id: initialData?.id, message: 'The user has been successfully updated', }
    return fulfillWithValue(customRes)
  } catch (error) {
    const customError = storeErrorHandler(error)
    return rejectWithValue(customError)
  }
})
//::: 

//::: get current user
export const getCurrentUser = createAsyncThunk('users/getCurrentUser', async (_, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.get(`/${USER}`)
    const customRes = res?.data
    return fulfillWithValue(customRes)
  } catch (error) {
    // const customError = error?.response?.data
    const customError = storeErrorHandler(error)
    return rejectWithValue(customError)
  }
})
//:::

//::: get single user 
export const getSigleUser = createAsyncThunk('users/getSingleuser', async (initialData, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  const { id } = usePathname()
  try {
    const res = await AXIOS.get(`/${USER}/${id}`)
    const customRes = res?.data
    return fulfillWithValue(customRes)
  } catch (error) {
    // const customError = error?.response?.data
    const customError = storeErrorHandler(error)
    rejectWithValue(customError)
  }

})
//:::

//::: add user
export const addUser = createAsyncThunk('categories/addUser', async (initialData, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.post(`/${USER}/add`, initialData)
    const customRes = { message: 'The user has been successfully added', status: res?.status }
    return fulfillWithValue(customRes)
  } catch (error) {
    const customError = storeErrorHandler(error)
    return rejectWithValue(customError)
  }
})
//:::

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //::: get users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.isEmpty = false
        state.success = null
        state.error = null
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.isEmpty = payload?.length === 0 ? true : false
        state.success = { message: 'The users has been successfully called' }
        state.error = null
        state.data = payload
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = true
        state.success = null
        state.error = payload
      })
      //::: delete user
      .addCase(deleteUser.pending, (state) => {
        state.deleteData.isLoading = true
        state.deleteData.isSuccess = false
        state.deleteData.isError = false
        state.deleteData.error = null
        state.deleteData.success = null
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.deleteData.isLoading = false
        state.deleteData.isSuccess = true
        state.deleteData.isError = false
        state.deleteData.success = payload
        state.deleteData.error = null
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.deleteData.isLoading = false
        state.deleteData.isSuccess = false
        state.deleteData.isError = true
        state.deleteData.success = null
        state.deleteData.error = payload
      })
      //::: update user
      .addCase(updateUser.pending, (state) => {
        state.updateData.isLoading = false
        state.updateData.isSuccess = false
        state.updateData.isError = true
        state.updateData.success = null
        state.updateData.error = null
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.updateData.isLoading = false
        state.updateData.isSuccess = true
        state.updateData.isError = false
        state.updateData.success = payload
        state.updateData.error = null
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.updateData.isLoading = false
        state.updateData.isSuccess = false
        state.updateData.isError = true
        state.updateData.success = null
        state.updateData.error = payload
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.currentData.data = null
        state.currentData.isLoading = true
        state.currentData.isSuccess = false
        state.currentData.isError = false
        state.currentData.isEmpty = false
        state.currentData.success = null
        state.currentData.error = null
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.currentData.data = payload
        state.currentData.isLoading = false
        state.currentData.isSuccess = true
        state.currentData.isError = false
        state.currentData.isEmpty = !payload ? true : false
        state.currentData.success = { message: 'The current user has been successfully called' }
        state.currentData.error = null
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.currentData.data = null
        state.currentData.isLoading = false
        state.currentData.isSuccess = false
        state.currentData.isError = true
        state.currentData.isEmpty = false
        state.currentData.success = null
        state.currentData.error = payload
      })
      .addCase(getSigleUser.pending, (state) => {
        state.singleData.data = null
        state.singleData.isLoading = true
        state.singleData.isSuccess = false
        state.singleData.isError = false
        state.singleData.isEmpty = false
        state.singleData.success = null
        state.singleData.error = null
      })
      .addCase(getSigleUser.fulfilled, (state, { payload }) => {
        state.singleData.data = payload
        state.singleData.isLoading = false
        state.singleData.isSuccess = true
        state.singleData.isError = false
        state.singleData.isEmpty = !payload ? true : false
        state.singleData.success = payload
        state.singleData.error = null
      })
      .addCase(getSigleUser.rejected, (state, { payload }) => {
        state.singleData.data = null
        state.singleData.isLoading = false
        state.singleData.isSuccess = false
        state.singleData.isError = true
        state.singleData.isEmpty = false
        state.singleData.success = null
        state.singleData.error = payload
      })
      //::: add user
      .addCase(addUser.pending, (state) => {
        state.addData.data = {}
        state.addData.isLoading = true
        state.addData.isSuccess = false
        state.addData.isError = false
        state.addData.isEmpty = false
        state.addData.success = null
        state.addData.error = null
      })
      .addCase(addUser.fulfilled, (state, { payload }) => {
        state.addData.data = payload
        state.addData.isLoading = false
        state.addData.isSuccess = true
        state.addData.isError = false
        state.addData.isEmpty = payload ? false : true
        state.addData.success = payload
        state.addData.error = null
      })
      .addCase(addUser.rejected, (state, { payload }) => {
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

export default usersSlice.reducer
export const usersSelector = (state) => state.users
export const deleteUserSelector = (state) => state.users.deleteData
export const updateUserSelector = (state) => state.users.updateData
export const currentUserSelector = (state) => state.users.currentData
export const singleUserSelector = (state) => state.users.singleData
export const addUserSelector = (state) => state.users.addData