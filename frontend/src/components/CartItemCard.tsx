import React, { useState } from 'react';
import { MdDeleteOutline, MdRemove, MdAdd, MdCheck } from 'react-icons/md';
import { useDispatch } from "react-redux";
import { increase, decrease, removeItem } from "../features/cart/cartSlice";

type Prop = {
    id: string,
    name: string,
    category: string,
    amount: number,
    historyDetailsEditMode: boolean
}

const CartItemCard = ({ id, name, amount, historyDetailsEditMode }: Prop) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [completeMode, setCompleteMode] = useState<boolean>(false);

    const dispatch = useDispatch();

    return (
            <div className='cart-item-card-container'>
                <div className="edit-completion-and-name-container">
                    {historyDetailsEditMode ? !completeMode ? (
                        <>
                            <button className="edit-completion-btn" onClick={() => setCompleteMode(true)}></button>
                            <p className='item-name'>{name}</p>
                        </>
                    ) : (
                        <>
                            <button className="edit-completion-btn" onClick={() => setCompleteMode(false)}><MdCheck color='#F9A109' size='22px' /></button>
                            <p className='item-name' style={{textDecoration: 'line-through'}}>{name}</p>
                        </>
                    ) : <p className='item-name'>{name}</p>}
                </div>
                {editMode ? historyDetailsEditMode ? (
                    <div className="edit-amount-bar">
                        <button className='amount-btn' onClick={() => setEditMode(true)}>{amount} pics</button>
                    </div>
                ) : (
                    <div className="edit-amount-bar" style={{backgroundColor: '#ffffff'}}>
                        <button className='delete-btn'><MdDeleteOutline size="18px" color='#ffffff' onClick={() => dispatch(removeItem(id))} /></button>
                        <button className='decrement-btn'><MdRemove size="22px" color='#F9A109' onClick={() => dispatch(decrease(id))} /></button>
                        <button className='amount-btn' onClick={() => setEditMode(false)} >{amount} pics</button>
                        <button className="increment-btn"><MdAdd size="22px" color='#F9A109'onClick={() => dispatch(increase(id))} /></button>
                    </div>
                ) : (
                    <div className="edit-amount-bar">
                        <button className='amount-btn' onClick={() => setEditMode(true)}>{amount} pics</button>
                    </div>
                )}  
            </div>
    );
};

export default CartItemCard;