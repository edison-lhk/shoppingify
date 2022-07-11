import React, { useEffect, useState } from 'react';
import { RootState } from '../store';
import HistoryCard from './HistoryCard';
import { useSelector } from "react-redux";

type Prop = {
    category: string,
    setHistoryDetailsViewMode: React.Dispatch<React.SetStateAction<boolean>>,
    setHistoryDetailsId: React.Dispatch<React.SetStateAction<string>>,
    setHistoryDetailsEditMode: React.Dispatch<React.SetStateAction<boolean>>
};

const HistoryGroup = ({ category, setHistoryDetailsViewMode, setHistoryDetailsId, setHistoryDetailsEditMode }: Prop) => {

    const history = useSelector((state: RootState) => state.history);

    const [historyCardList, setHistoryCardList] = useState<{ id: string, name: string, items: { id: string, name: string, category: string, image?: string; note?: string, amount: number }[], status: string, createdAt: Date}[]>([]);

    const formatDateCategory = (dateString: string) => {
        const date = new Date(dateString);

        const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return `${monthList[date.getMonth()]} ${date.getFullYear()}`;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        const weekList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return `${weekList[date.getDay()]} ${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}.${date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}.${date.getFullYear()}`;
    }

    useEffect(() => {

        if (history.shoppingLists.length > 0) {

            const shoppingListForSort = [...history.shoppingLists];

            setHistoryCardList(shoppingListForSort.sort((shoppingListA, ShoppingListB) => {
                const createdAtA: Date = new Date(shoppingListA.createdAt.toString());
                const createdAtB: Date = new Date(ShoppingListB.createdAt.toString());

                if (createdAtA > createdAtB) {
                    return -1;
                } else if (createdAtA < createdAtB) {
                    return 1;
                } else {
                    return 0;
                }

            }));

        }

    }, []);

    return (
        <div className="history-group">
            <h3 className="date-category">{category}</h3>
            <div className="history-list">
                {history.shoppingLists.length > 0 ? historyCardList.map(shoppingList => formatDateCategory(shoppingList.createdAt.toString()) === category ? <HistoryCard key={shoppingList.id} id={shoppingList.id} name={shoppingList.name} date={formatDate(shoppingList.createdAt.toString())} status={shoppingList.status} setHistoryDetailsViewMode={setHistoryDetailsViewMode} setHistoryDetailsId={setHistoryDetailsId} setHistoryDetailsEditMode={setHistoryDetailsEditMode} /> : null) : null}
            </div>
        </div>
    );
};

export default HistoryGroup;