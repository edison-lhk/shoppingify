import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from '../store';
import HistoryGroup from './HistoryGroup';
import Loading from './Loading';

const HistorySection = () => {
    const history = useSelector((state: RootState) => state.history);

    console.log(history);

    let category = '';

    if (history.shoppingLists.length !== 0 && history.shoppingLists[0].createdAt) {
        const date = new Date(history.shoppingLists[0].createdAt);

        category = `${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }
    

    return (
        <div className='history-section'>
            <div className="history-list-container">
                <header>
                    <h1>Shopping History</h1>
                </header>
                <section className='history-group-container'>
                    {history.isLoading ? <Loading border='6px' size='50px' color='#C1C1C4' /> : <HistoryGroup category={'July 2022'} />}
                </section>
            </div>
        </div>
    );
};

export default HistorySection;