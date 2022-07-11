import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import HistorySection from '../components/HistorySection';
import ShoppingList from '../components/ShoppingList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { getUser } from '../features/user/userSlice';
import { getHistory } from '../features/history/historySlice';
import { calculateTotalAmount } from '../features/cart/cartSlice';

const History = () => {
    const history = useSelector((state: RootState) => state.history);
    const user = useSelector((state: RootState) => state.user);
    const cart = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch<AppDispatch>();

    const [historyDetailsId, setHistoryDetailsId] = useState<string>('');
    const [historyDetailsViewMode, setHistoryDetailsViewMode] = useState<boolean>(false);
    const [itemDetailsViewMode, setItemDetailsViewMode] = useState<boolean>(false);
    const [historyDetailsEditMode, setHistoryDetailsEditMode] = useState<boolean>(false);

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
      <div className='history-page-container'>
          <NavBar />
          <HistorySection historyDetailsId={historyDetailsId} setHistoryDetailsId={setHistoryDetailsId} historyDetailsViewMode={historyDetailsViewMode} setHistoryDetailsViewMode={setHistoryDetailsViewMode} itemDetailsViewMode={itemDetailsViewMode} setItemDetailsViewMode={setItemDetailsViewMode} setHistoryDetailsEditMode={setHistoryDetailsEditMode} />
          {!itemDetailsViewMode ? <ShoppingList historyDetailsId={historyDetailsId} setHistoryDetailsViewMode={setHistoryDetailsViewMode} historyDetailsEditMode={historyDetailsEditMode} setHistoryDetailsEditMode={setHistoryDetailsEditMode} /> : null}
      </div>
    );
};

export default History;