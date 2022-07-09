import React from 'react';
import HistoryCard from './HistoryCard';

type Prop = {
    category: string
};

const HistoryGroup = ({ category }: Prop) => {
    return (
        <div className="history-group">
            <h3 className="date-category">{category}</h3>
            <div className="history-list">
                <HistoryCard name='Queenie Bday' date='Fri 8.7.2022' status='completed' />
            </div>
        </div>
    );
};

export default HistoryGroup;