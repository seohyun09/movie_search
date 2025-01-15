import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import MovieSearch from './components/MovieSearch/MovieSearch';
import Main from './pages/main/main';
import MovieDetail from './pages/moviedetail/moviedetail';

function App() {
    const [searchMovie, setSearchMovie] = useState('');

    return (
        <Router>
            <div className='App'>
                <MovieSearch setSearchMovie={setSearchMovie} />
                <Routes>
                    <Route path='' element={<Main searchMovie={searchMovie} setSearchMovie={setSearchMovie} />} />
                    <Route path='/moviedetail/:id' element={<MovieDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
