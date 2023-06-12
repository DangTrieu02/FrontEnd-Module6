// service/userService.js
import {createAsyncThunk} from "@reduxjs/toolkit";
import customAPI from "./customAPI";

export const login = createAsyncThunk(
    'users/login',
    async (user) => {
        const res = await customAPI().post('/users/login', user);
        return res.data;
    })

export const changePassword = createAsyncThunk(
    'users/change-password/:idUser',
    async (data) => {
        const res = await customAPI().put(`/users/change-password/${data.idUser}`, data.user);
        return res.data;
    }
)