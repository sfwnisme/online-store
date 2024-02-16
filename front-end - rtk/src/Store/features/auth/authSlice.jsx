import { createSlice } from '@reduxjs/toolkit'
import Cookie from 'cookie-universal'

const cookie = Cookie()
const TOKEN = cookie.get('e-commerce')

const authSlice = createSlice({
  name: 'auth',
  initialState: { TOKEN },
  reducers: {}
})

export default authSlice.reducer