import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";

export type UserState = {
    id: string,
    username: string,
    email: string,
    items: string[],
    isAuthorized: boolean
}

const initialState: UserState = {
    id: '',
    username: '',
    email: '',
    items: [],
    isAuthorized: false
};

export const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
    try {
        const response: AxiosResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users`, { withCredentials: true });
        return response.data.user;
    } catch (error: AxiosError | any) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
});

export const logoutUser = createAsyncThunk('user/logoutUser', async (_, thunkAPI) => {
    try {
        const response: AxiosResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/auth/logout`, { withCredentials: true });
        return response.data.message;
    } catch (error: AxiosError | any) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [getUser.fulfilled.toString()]: (state: UserState, action: PayloadAction<{ id: string, username: string, email: string, items: string[] }>) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.items = action.payload.items;
            state.isAuthorized = true;
        },
        [getUser.rejected.toString()]: (state: UserState, action: PayloadAction<string>) => {
            toast.error(action.payload, { autoClose: 2000 });
            window.location.href = `${process.env.REACT_APP_CLIENT_URL}/#/`;
            state.isAuthorized = false;
        },
        [logoutUser.fulfilled.toString()]: (state: UserState, action: PayloadAction<string>) => {
            state.id = '';
            state.username = '';
            state.email = '';
            state.items = [];
            state.isAuthorized = false;
            toast.success(action.payload, { autoClose: 2000 });
            window.location.href = `${process.env.REACT_APP_CLIENT_URL}/#/`;
        },
        [logoutUser.rejected.toString()]: (state: UserState, action: PayloadAction<string>) => {
            toast.error(action.payload, { autoClose: 2000 });
        }
    }
});

export default userSlice.reducer;