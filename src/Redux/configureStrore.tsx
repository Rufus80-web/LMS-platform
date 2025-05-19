import {configureStore} from '@reduxjs/toolkit'
import {isLoggedIn} from "./Slices/AuthSlice"


const ReduxStore = configureStore({
   reducer: {
     loginMiddleware: isLoggedIn
   }
})

export default ReduxStore;