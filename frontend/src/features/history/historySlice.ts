import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { RootState } from "../../store";

export type HistoryState = {
    shoppingLists: Array<{ 
        id: string,
        name: string, 
        items: Array<{ id: string, name: string, category: string, image?: string, note?: string, amount: number }>, 
        status: string, 
        createdAt: Date 
    }> | [],
    isLoading: boolean
}

const initialState: HistoryState = {
    shoppingLists: [],
    isLoading: true
};

export const getHistory = createAsyncThunk('history/getHistory', async (_, thunkAPI) => {
    try {
        const { user } = thunkAPI.getState() as RootState;
        const response: AxiosResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/history/${user.id}`, { withCredentials: true });
        return response.data.history;
    } catch (error: AxiosError | any) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
});

export const updateHistoryStatus = createAsyncThunk('history/updateHistoryStatus', async({ historyId, status }: { historyId: string, status: string }, thunkAPI) => {
    try {
        const { user } = thunkAPI.getState() as RootState;
        const response: AxiosResponse = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/history/updateStatus/${user.id}/${historyId}`, { status }, { withCredentials: true });
        return { message: response.data.message, historyId, status };
    } catch (error: AxiosError | any) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
});

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {},
    extraReducers: {
        [getHistory.pending.toString()]: (state: HistoryState) => {
            state.isLoading = true;
        },
        [getHistory.fulfilled.toString()]: (state: HistoryState, action) => {
            state.shoppingLists = action.payload;
            state.isLoading = false;
        },
        [getHistory.rejected.toString()]: (state: HistoryState, action: PayloadAction<string>) => {
            toast.error(action.payload, { autoClose: 2000 });
            state.isLoading = false;
        },
        [updateHistoryStatus.pending.toString()]: (state: HistoryState) => {
            state.isLoading = true;
        },
        [updateHistoryStatus.fulfilled.toString()]: (state: HistoryState, action: PayloadAction<{ message: string, historyId: string ,status: string }>) => {
            toast.success(action.payload.message, { autoClose: 2000 });
            state.shoppingLists = state.shoppingLists.map(shoppingList => shoppingList.id === action.payload.historyId ? { ...shoppingList, status: action.payload.status } : shoppingList );
            state.isLoading = false;
        },
        [updateHistoryStatus.rejected.toString()]: (state: HistoryState, action: PayloadAction<string>) => {
            toast.error(action.payload, { autoClose: 2000 });
            state.isLoading = false;
        },
    }
});

export default historySlice.reducer;