import {createSlice} from "@reduxjs/toolkit";
import {login} from "../../service/userService";

const initialState ={
    currentState:JSON.parse(localStorage.getItem("user")),
    user:[]
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{},
    extraReducers:builder => {
        console.log(2)
        builder.addCase(login.fulfilled,(state,action)=>{
            console.log(1)
            state.currentState= action.payload
            localStorage.setItem("user",JSON.stringify(action.payload))
            localStorage.setItem("access-token",action.payload.token)
        })
    }
})
export default userSlice.reducer