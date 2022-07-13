import React from 'react';

type Prop = {
    name: string,
    percentage: number,
    color: string
}

const StatusBar = ({ name, percentage, color }: Prop) => {
    return (
        <div className="stats-bar-container">
            <div className="info">
                <p className='name'>{name}</p>
                <p className='percentage'>{percentage}%</p>
            </div>
            <div className="bar">
                <span style={{width: `${percentage}%`, backgroundColor: `${color}`}}></span>
            </div>
        </div>
    );
};

export default StatusBar;