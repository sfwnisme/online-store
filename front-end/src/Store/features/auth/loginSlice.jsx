import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL, LOGIN } from '../../../Api/API'
import Cookie from 'cookie-universal'

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
  success: null,
}
const cookie = Cookie()
//::: login action
export const loginUser = createAsyncThunk('login/loginUser', async (initialData, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  try {
    const res = await axios.post(`${BASE_URL}/${LOGIN}`, initialData)
    cookie.set('e-commerce', res?.data?.token)
    const customRes = { user: res?.data?.user, message: 'The user has been successfully signed', status: res?.status }
    return fulfillWithValue(customRes)
  } catch (error) {
    const serverError = error?.response?.status.toString().split('')[0] === '5'
    const clientError = error?.response?.data?.error
    const errorMessage = serverError ? 'server error' : clientError
    const customError = { message: errorMessage, status: error?.response?.status }
    return rejectWithValue(customError)
  }
})


const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.success = null
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.success = payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.success = null
        state.error = payload
      })
  }
})


export default loginSlice.reducer
export const loginUserSelector = (state) => state.login