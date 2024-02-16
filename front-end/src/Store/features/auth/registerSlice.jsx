import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookie from 'cookie-universal'
import { BASE_URL, REGISTER } from '../../../Api/API'
import axios from 'axios'

const cookie = Cookie()

//:::
const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
  success: null,
}
//:::

//::: register function
export const registerUser = createAsyncThunk('register/registerUser', async (initialData, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  try {
    const res = await axios.post(`${BASE_URL}/${REGISTER}`, initialData)
    cookie.set('e-commerce', res?.data?.token)
    const customRes = { user: res?.data?.user, message: 'The user has successfully registered', status: res?.status }
    return fulfillWithValue(customRes)
  } catch (error) {
    const serverError = error?.response?.status.toString().split('')[0] === '5'
    const clientError = error?.response?.data?.message
    const errorMessage = serverError ? 'server error' : clientError
    const customError = { message: errorMessage, status: error?.response?.status }
    return rejectWithValue(customError)
  }
})
//:::

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.success = null
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.success = payload
        state.error = null
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.success = null
        state.error = payload
      })
  }
})

export default registerSlice.reducer
export const registerUserSelector = (state) => state.register