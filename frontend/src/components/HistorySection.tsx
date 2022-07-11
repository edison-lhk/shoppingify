import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from '../store';
import HistoryDetails from './HistoryDetails';
import HistoryGroup from './HistoryGroup';
import Loading from './Loading';

type Prop = {
    historyDetailsId: string,
    setHistoryDetailsId: React.Dispatch<React.SetStateAction<string>>,
    historyDetailsViewMode: boolean,
    setHistoryDetailsViewMode: React.Dispatch<React.SetStateAction<boolean>>,
    itemDetailsViewMode: boolean,
    setItemDetailsViewMode: React.Dispatch<React.SetStateAction<boolean>>,
    setHistoryDetailsEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

const HistorySection = ({ historyDetailsId, setHistoryDetailsId , historyDetailsViewMode, setHistoryDetailsViewMode, itemDetailsViewMode, setItemDetailsViewMode, setHistoryDetailsEditMode }: Prop) => {
    const history = useSelector((state: RootState) => state.history);

    const [dateCategories, setDateCategories] = useState<string[]>([]);

    const formatDateCategory = (dateString: string) => {
        const date = new Date(dateString);

        const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return `${monthList[date.getMonth()]} ${date.getFullYear()}`;
    }

    useEffect(() => {

        if (history.shoppingLists.length > 0) {

            const dateCategoryList: string[] = [];

            history.shoppingLists.forEach(shoppingList => dateCategoryList.push(formatDateCategory(shoppingList.createdAt.toString())));

            const dateCategorySet = Array.from(new Set(dateCategoryList));

            setDateCategories(dateCategorySet.sort((dateCategoryA, dateCategoryB) => {

                if (new Date(dateCategoryA) > new Date(dateCategoryB)) {
                    return -1;
                } else if (new Date(dateCategoryA) < new Date(dateCategoryB)) {
                    return 1;
                } else {
                    return 0;
                }

            }));

        }

    }, [history.shoppingLists]);

    return (
        <div className='history-section'>
            {!historyDetailsViewMode ? (
                <div className="history-list-container">
                    <header>
                        <h1>Shopping History</h1>
                    </header>
                    <section className='history-group-container'>
                        {history.isLoading ? <Loading border='6px' size='50px' color='#C1C1C4' /> : history.shoppingLists.length > 0 ? (
                            <>
                                {dateCategories.map(dateCategory => <HistoryGroup key={dateCategory} category={dateCategory} setHistoryDetailsViewMode={setHistoryDetailsViewMode} setHistoryDetailsId={setHistoryDetailsId} setHistoryDetailsEditMode={setHistoryDetailsEditMode} />)}
                            </>
                        ) : <p className='no-history'>No history yet</p>}
                    </section>
                </div>
            ) : <HistoryDetails id={historyDetailsId} setHistoryDetailsViewMode={setHistoryDetailsViewMode} setHistoryDetailsEditMode={setHistoryDetailsEditMode} itemDetailsViewMode={itemDetailsViewMode} setItemDetailsViewMode={setItemDetailsViewMode} />}
        </div>
    );
};

export default HistorySection;