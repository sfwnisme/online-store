import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AXIOS } from '../../../Api/AXIOS.JSX'
import { LOGOUT } from '../../../Api/API'

//::: logout state
const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
  success: null
}
//:::

//::: logout actoin
export const logoutUser = createAsyncThunk('logout/logoutUser', async (_, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.get(`/${LOGOUT}`)
    const customRes = { message: 'The user has been successfully logged out', status: res?.status }
    return fulfillWithValue(customRes)
  } catch (error) {
    const serverError = error?.response?.status.toString().split('')[0] === '5'
    const clientError = error?.response?.data?.message
    const errorMessage = serverError ? 'server error' : clientError
    const customError = { message: errorMessage, status: error?.response?.status }
    return rejectWithValue(customError)
  }
})


const logoutSlice = createSlice({
  name: 'logou',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.success = null
        state.error = null
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.success = payload
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.success = null
        state.error = payload
      })
  }
})

export default logoutSlice.reducer
export const logoutSelector = (state) => state.logout