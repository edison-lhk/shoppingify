import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Items from './pages/Items';
import History from './pages/History';
import Statistics from './pages/Statistics';

const App = (): JSX.Element => {
    return (
        <Router basename='/'>
            <div className="container">
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/dashboard/items' element={<Items />} />
                    <Route path='/dashboard/history' element={<History />} />
                    <Route path='/dashboard/statistics' element={<Statistics />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;