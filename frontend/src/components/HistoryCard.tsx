import React from 'react';
import { MdEventNote, MdKeyboardArrowRight } from "react-icons/md";

type Prop = {
    id: string,
    name: string,
    date: string,
    status: string,
    setHistoryDetailsViewMode: React.Dispatch<React.SetStateAction<boolean>>,
    setHistoryDetailsId: React.Dispatch<React.SetStateAction<string>>,
    setHistoryDetailsEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

const HistoryCard = ({ id, name, date, status, setHistoryDetailsViewMode, setHistoryDetailsId, setHistoryDetailsEditMode }: Prop) => {

    return (
        <div className="history-card-container">
            <p className="history-name">{name}</p>
            <div className="history-description-container">
                <div className="history-date-container">
                    <div className="date-icon"><MdEventNote color='#C1C1C4' size='22px'/></div>
                    <p className='history-date'>{date}</p>
                </div>
                {status !== 'cancelled' ? <button className='history-status'>{status}</button> : <button className='history-status' style={{borderColor: '#EB5757', color: '#EB5757'}} >{status}</button>}
                <button className="go-to-history-details-btn" onClick={() => {
                    setHistoryDetailsViewMode(true);
                    if (status === 'active') setHistoryDetailsEditMode(true);
                    setHistoryDetailsId(id);
                }} ><MdKeyboardArrowRight color='#F9A109' size='30px' /></button>
            </div>
        </div>
    )
};

export default HistoryCard;