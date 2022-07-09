import React from 'react';
import { CartItems } from '../features/cart/cartSlice';
import CartItemCard from './CartItemCard';

type Prop = {
    category: string,
    items: CartItems
}

const CartItemGroup = ({ category, items }: Prop) => {
  return (
    <div className="cart-item-group-container">
        <h3>{category}</h3>
        {items.map(item => <CartItemCard key={item.id} {...item} />)}
    </div>
  );
};

export default CartItemGroup;