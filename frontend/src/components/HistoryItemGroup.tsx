import React from 'react';
import HistoryItemCard from './HistoryItemCard';

type Prop = {
    category: string,
    items: { id: string, name: string, category: string, image?: string, note?: string, amount: number }[],
    setItemDetailsViewMode: React.Dispatch<React.SetStateAction<boolean>>,
    setItemDetailsId: React.Dispatch<React.SetStateAction<string>>
}

const HistoryItemGroup = ({ category, items, setItemDetailsViewMode, setItemDetailsId }: Prop) => {

    return (
        <div className='history-item-group-container'>
            <h3>{category}</h3>
            <div className="item-list">
                {items.map(item => <HistoryItemCard key={item.id} id={item.id} name={item.name} amount={item.amount} setItemDetailsViewMode={setItemDetailsViewMode} setItemDetailsId={setItemDetailsId} />)}
            </div>
        </div>
    );
};

export default HistoryItemGroup;