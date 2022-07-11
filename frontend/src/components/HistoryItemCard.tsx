import React from 'react';

type Prop = {
    id: string,
    name: string,
    amount: number,
    setItemDetailsViewMode: React.Dispatch<React.SetStateAction<boolean>>,
    setItemDetailsId: React.Dispatch<React.SetStateAction<string>>
}

const HistoryItemCard = ({ id, name, amount, setItemDetailsViewMode, setItemDetailsId }: Prop) => {
    return (
        <div className='history-item-card-container' onClick={() => {
            setItemDetailsId(id);
            setItemDetailsViewMode(true);
        }}>
            <p className='name'>{name}</p>
            <p className='amount'>{amount} pcs</p>
        </div>
    );
};

export default HistoryItemCard;