import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import HistorySection from '../components/HistorySection';
import ShoppingList from '../components/ShoppingList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { getUser } from '../features/user/userSlice';
import { getHistory } from '../features/history/historySlice';

const History = () => {
    const history = useSelector((state: RootState) => state.history);
    const user = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUser());
    }, []);

    useEffect(() => {

        if (user.isAuthorized) {
            dispatch(getHistory());
        }
    
    }, [user.isAuthorized]);

    return (
      <div className='history-page-container'>
          <NavBar />
          <HistorySection />
          <ShoppingList />
      </div>
    );
};

export default History;