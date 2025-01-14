import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Main from './pages/main/main';
import MovieDetail from '../src/pages/moviedetail/moviedetail';

function App() {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='' element={<Main />} />
                    <Route path='/moviedetail/:id' element={<MovieDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
