import React from 'react';
import { MdEventNote, MdKeyboardArrowRight } from "react-icons/md";

type Prop = {
    name: string,
    date: string,
    status: string
}

const HistoryCard = ({ name, date, status }: Prop) => {
    return (
        <div className="history-card-container">
            <p className="history-name">{name}</p>
            <div className="history-description-container">
                <div className="history-date-container">
                    <div className="date-icon"><MdEventNote color='#C1C1C4' size='22px'/></div>
                    <p className='history-date'>{date}</p>
                </div>
                <button className='history-status'>{status}</button>
                <button className="go-to-history-details-btn"><MdKeyboardArrowRight color='#F9A109' size='30px' /></button>
            </div>
        </div>
    )
};

export default HistoryCard;