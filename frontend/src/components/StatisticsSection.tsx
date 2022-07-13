import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Loading from './Loading';
import { getListOfTopItems, getListOfTopCategories, getListOfMonthlySummary } from '../utils/stats';
import StatusBar from './StatusBar';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

const StatisticsSection = () => {
    
    const history = useSelector((state: RootState) => state.history);

    const [topItemsList, setTopItemsList] = useState<{ name: string, percentage: number }[]>([]);
    const [topCategoriesList, setTopCategoriesList] = useState<{ name: string, percentage: number }[]>([]);
    const [monthlySummaryList, setMonthSummaryList] = useState<{ month: string, items: number }[]>([]);
    const [chartHeight, setChartHeight] = useState<number>();
 
    useEffect(() => {

        if (history.shoppingLists.length > 0) {
            setTopItemsList(getListOfTopItems(history.shoppingLists));
            setTopCategoriesList(getListOfTopCategories(history.shoppingLists));
            setMonthSummaryList(getListOfMonthlySummary(history.shoppingLists));
        }

    }, [history]);

    useEffect(() => {

        if (window.innerWidth < 510) {
            setChartHeight(200);
        } else {
            setChartHeight(300);
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth < 510) {
                setChartHeight(200);
            } else {
                setChartHeight(300);
            }
        });

    }, []);

    return (
        <div className='stats-section'>
            {history.isLoading ? <Loading border='6px' size='50px' color='#C1C1C4' /> : history.shoppingLists.length > 0 ? (
                <>
                    <div className="stats-list-container">
                        <div className="top-items-container">
                            <h3>Top Items</h3>
                            <div className="stats-bar-lists-container">
                                {topItemsList.length > 0 ? topItemsList.map(item => <StatusBar key={item.name} name={item.name} percentage={item.percentage} color='#F9A109' />) : null}
                            </div>
                        </div>
                        <div className="top-categories-container">
                            <h3>Top Categories</h3>
                            <div className="stats-bar-lists-container">
                                {topCategoriesList.length > 0 ? topCategoriesList.map(category => <StatusBar key={category.name} name={category.name} percentage={category.percentage} color='#56CCF2' />) : null}
                            </div>
                        </div>
                    </div>
                    <div className="month-summary-container">
                        <h3>Monthly Summary</h3>
                        <div className="line-chart-container">
                            <ResponsiveContainer width='100%' height={chartHeight}>
                                <LineChart data={monthlySummaryList} margin={{ top: 0, left: -30, right: 30, bottom: 0 }}>
                                    <Line type="monotone" dataKey="items" stroke="#F9A109" />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                                    <XAxis dataKey="month" />
                                    <YAxis/>
                                    <Legend />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </> 
            ) : <p className='no-stats'>No statistics yet</p>}
        </div>
    );
};

export default StatisticsSection;