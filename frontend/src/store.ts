import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CartState } from "./features/cart/cartSlice";
import userReducer, { UserState } from "./features/user/userSlice";
import historyReducer, { HistoryState } from "./features/history/historySlice";

export type RootState = {
    cart: CartState,
    user: UserState,
    history: HistoryState
}

const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        history: historyReducer
    }
});

export type AppDispatch = typeof store.dispatch;

export default store;