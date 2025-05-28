import { createSlice } from "@reduxjs/toolkit";
import { AuthSliceProps } from "../../static/Interface";
import { parseJWT } from "../../services/decode-token";

const initState: AuthSliceProps = {
  token: null,
  user: null,
  isLoggedIn: false
};

const AuthSlice = createSlice({
  name: "Auths",
  initialState: initState,
  reducers: {
    setToken: (state, action) => {
      const token: string = action.payload
      state.token = token // Not persistent. Dies on page refresh
      state.isLoggedIn = true
      
      // Store token to localstrorage
      localStorage.setItem('token', token) //Persistent
      localStorage.setItem('user-data', JSON.stringify(parseJWT(token))) //Persistent - More better way is to use redux-persistence library
      // Decode the token
      state.user = parseJWT(token) // Not persistent. Dies on page refresh
    },
    logout: (state) => {
      state.token = null
      state.token = null
      state.isLoggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user-data')
    }
  },
});

export const { setToken, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
