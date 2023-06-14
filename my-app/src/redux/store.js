import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./slice/userSlice";
import userListReducer from "./slice/listUserSlice"

const store = configureStore({
    reducer:{
        user:userReducer,
        userList: userListReducer
    }

})
export default store