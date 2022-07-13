import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import ItemSection from "../components/ItemSection";
import ShoppingList from "../components/ShoppingList";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, calculateTotalAmount, setCartItems } from "../features/cart/cartSlice";
import { getUser } from "../features/user/userSlice";
import { RootState, AppDispatch } from "../store";

const Items = (): JSX.Element => {
    const cart = useSelector((state: RootState) => state.cart);
    const user = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch<AppDispatch>();

    const [itemDetailsViewMode, setItemDetailsViewMode] = useState<boolean>(false);

    const shoppingListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(getUser());
    }, []);

    useEffect(() => {

        if (user.isAuthorized) {
            let cartItems = localStorage.getItem('cartItems');
            
            if (cartItems) {
                cartItems = JSON.parse(cartItems);  

                if (cartItems!.length > 0) {
                    dispatch(setCartItems(cartItems));
                } else {
                    dispatch(getCartItems());
                }
            }
        }
    
    }, [user.isAuthorized]);

    useEffect(() => {
        dispatch(calculateTotalAmount());
    }, [cart.cartItems]);

    if (!user.isAuthorized) return <></>;

    return (
        <div className="items-page-container">
            <NavBar shoppingListRef={shoppingListRef} />
            <ItemSection itemDetailsViewMode={itemDetailsViewMode} setItemDetailsViewMode={setItemDetailsViewMode} />
            {!itemDetailsViewMode ? <ShoppingList shoppingListRef={shoppingListRef} /> : null}
        </div>
    );
};

export default Items;