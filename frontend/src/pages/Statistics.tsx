import React, { useEffect, useRef } from 'react'
import NavBar from '../components/NavBar';
import ShoppingList from '../components/ShoppingList';
import StatisticsSection from '../components/StatisticsSection';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { getUser } from '../features/user/userSlice';
import { calculateTotalAmount } from '../features/cart/cartSlice';
import { getHistory } from '../features/history/historySlice';

const Statistics = () => {
    const user = useSelector((state: RootState) => state.user);
    const cart = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch<AppDispatch>();

    const shoppingListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(getUser());
    }, []);

    useEffect(() => {

        if (user.isAuthorized) {
            dispatch(getHistory());
        }
    
    }, [user.isAuthorized]);

    useEffect(() => {
        dispatch(calculateTotalAmount());
    }, [cart.cartItems]);

    return (
        <div className="stats-page-container">
            <NavBar shoppingListRef={shoppingListRef} />
            <StatisticsSection />
            <ShoppingList shoppingListRef={shoppingListRef} />
        </div>
    );
};

export default Statistics;