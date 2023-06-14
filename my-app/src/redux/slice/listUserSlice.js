import {createSlice} from "@reduxjs/toolkit";
import {getUserList} from "../../service/listUserService";

const initialState = {
    userList: []
}
const userListSlice = createSlice({
    name: 'userList',
    initialState,
    extraReducers: builder => {
        builder.addCase(getUserList.fulfilled, (state, action) => {
            state.userList = action.payload;
        })
    }
});

export default userListSlice.reducer;