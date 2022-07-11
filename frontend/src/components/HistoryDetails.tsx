import React, { useEffect, useState } from 'react';
import { MdArrowRightAlt, MdEventNote } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import HistoryItemGroup from './HistoryItemGroup';
import ItemDetails from './ItemDetails';

type Prop = {
    id: string,
    setHistoryDetailsViewMode: React.Dispatch<React.SetStateAction<boolean>>,
    setHistoryDetailsEditMode: React.Dispatch<React.SetStateAction<boolean>>,
    itemDetailsViewMode: boolean,
    setItemDetailsViewMode: React.Dispatch<React.SetStateAction<boolean>>
}

const HistoryDetails = ({ id, setHistoryDetailsViewMode, setHistoryDetailsEditMode, itemDetailsViewMode, setItemDetailsViewMode }: Prop) => {
    const history = useSelector((state: RootState) => state.history.shoppingLists.find(shoppingList => shoppingList.id === id));

    const [itemDetailsId, setItemDetailsId] = useState<string>('');
    const [itemDetailsEditMode, setItemDetailsEditMode] = useState<boolean>(false);

    const [itemCategories, setItemCategories] = useState<string[]>([]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        const weekList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return `${weekList[date.getDay()]} ${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}.${date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}.${date.getFullYear()}`;
    }

    useEffect(() => {
        if (history && history.items.length > 0) {
            setItemCategories(Array.from(new Set(history.items.map(item => item.category))));
        }

    }, []);

    return (
        <>
            <div className='history-details-container'>
                <div className="go-back-btn-container" onClick={() => {
                    setHistoryDetailsViewMode(false);
                    setHistoryDetailsEditMode(false);
                }}>
                        <div className="go-back-btn"><MdArrowRightAlt color='#F9A109' size='20px' style={{transform: 'rotate(180deg)'}} /></div>
                        <p>back</p>
                </div>
                <div className="history-description-container">
                    <h1 className="history-name">{history?.name}</h1>
                    <div className="history-date-container">
                        <div className="date-icon"><MdEventNote color='#C1C1C4' size='22px'/></div>
                        <p className='history-date'>{formatDate(history?.createdAt.toString() || '')}</p>
                    </div>
                </div>
                <div className="history-item-groups-container">
                    {itemCategories.map(itemCategory => <HistoryItemGroup key={itemCategory} category={itemCategory} items={history?.items.filter(item => item.category === itemCategory) || []} setItemDetailsViewMode={setItemDetailsViewMode} setItemDetailsId={setItemDetailsId} />)}
                </div>
            </div>
            {itemDetailsViewMode ? <ItemDetails id={itemDetailsId} setItemDetailsViewMode={setItemDetailsViewMode} itemDetailsEditMode={itemDetailsEditMode} setItemDetailsEditMode={setItemDetailsEditMode}   /> : null}
        </>
    );
};

export default HistoryDetails;