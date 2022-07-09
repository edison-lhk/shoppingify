import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { RootState } from "../../store";

export type CartState = {
    cartItems: Array<{
        id: string,
        name: string,
        category: string,
        image?: string,
        note?: string,
        amount: number
    }>,
    amount: number,
    isLoading: boolean
}

export type CartItems = Array<{ id: string, name: string, category: string, image?: string, note?: string, amount: number }>;

const initialState: CartState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems') as string) || [],
    amount: 0,
    isLoading: true
};

export const getCartItems = createAsyncThunk('cart/getCartItems', async(_, thunkAPI) => {
    try {
        const { user } = thunkAPI.getState() as RootState;
        const response: AxiosResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/items/${user.id}`, { withCredentials: true });
        return response.data.items;
    } catch (error: AxiosError | any) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increase: (state: CartState, action: PayloadAction<string>) => {
            const itemId = action.payload;
            const cartItem = state.cartItems.find(item => item.id === itemId);
            cartItem!.amount += 1;
        },
        decrease: (state: CartState, action: PayloadAction<string>) => {
            const itemId = action.payload;
            const cartItem = state.cartItems.find(item => item.id === itemId);
            cartItem!.amount -= 1;
        },
        removeItem: (state: CartState, action: PayloadAction<string>) => {
            const itemId = action.payload;
            const cartItem = state.cartItems.find(item => item.id === itemId);
            cartItem!.amount = 0;
        },
        deleteItem: (state: CartState, action: PayloadAction<string>) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== itemId);
        },
        calculateTotalAmount: (state: CartState) => {
            let amount = 0;
            state.cartItems.forEach(item => amount += item.amount);
            state.amount = amount;
        },
        setCartItems: (state: CartState, action) => {
            state.cartItems = action.payload;
            state.isLoading = false;
        }
    },
    extraReducers: {
        [getCartItems.pending.toString()]: (state: CartState) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled.toString()]: (state: CartState, action) => {
            state.cartItems = action.payload;
            state.cartItems = state.cartItems.map(item => ({ ...item, amount: 0 }));
            state.isLoading = false;
        },
        [getCartItems.rejected.toString()]: (state, action: PayloadAction<string>) => {
            toast.error(action.payload, { autoClose: 2000 });
            state.isLoading = false;
        }
    }
});

export const { increase, decrease, removeItem, deleteItem, calculateTotalAmount, setCartItems } = cartSlice.actions;

export default cartSlice.reducer;