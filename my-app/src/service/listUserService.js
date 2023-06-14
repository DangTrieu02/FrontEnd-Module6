import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getUserList = createAsyncThunk(
    'userList/getUserList',
    async () => {
        const res = await customAxios.get('user/list');
        return res.data;
    }
)