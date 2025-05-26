import { createSlice } from "@reduxjs/toolkit";
import { AuthSliceProps } from "../../static/Interface";
import { handleUserLogin } from "../reducers/authsReducer";

const initState: AuthSliceProps = {
  name: "Auths",
  initState: {
    username: "",
    isLoggedIn: false,
    redirect: "/login",
    redirected: false,
  },
};

const AuthSlice = createSlice({
  name: "Auths",
  initialState: initState,
  reducers: {
    isLoggedIn: (state, action) => {
      handleUserLogin(state, action);
    },
  },
  extraReducers(_builder) {},
});

export const { isLoggedIn } = AuthSlice.actions;
export default AuthSlice.reducer;
