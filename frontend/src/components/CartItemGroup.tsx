import React from 'react';
import { CartItems } from '../features/cart/cartSlice';
import CartItemCard from './CartItemCard';

type Prop = {
    category: string,
    items: CartItems,
    historyDetailsEditMode: boolean
}

const CartItemGroup = ({ category, items, historyDetailsEditMode }: Prop) => {
  return (
    <div className="cart-item-group-container">
        <h3>{category}</h3>
        <div className="item-list">
            {items.map(item => <CartItemCard key={item.id} {...item} historyDetailsEditMode={historyDetailsEditMode} />)}
        </div>
    </div>
  );
};

export default CartItemGroup;