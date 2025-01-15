import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieSearch.css';

import searchIcon from '../../assets/searchIcon.png';

function MovieSearch({ setSearchMovie }) {
    const [movieTitle, setMovieTitle] = useState('');
    const navigate = useNavigate();

    const handleMovieTitle = (e) => {
        setMovieTitle(e.target.value);
    };

    const handleSearch = () => {
        setSearchMovie(movieTitle);
        navigate('');
    };

    return (
        <div className='search-container'>
            <input
                className='search-input'
                placeholder='영화를 검색하세요'
                onChange={handleMovieTitle}
                value={movieTitle}
            />
            <button className='search-button' onClick={handleSearch}>
                <img className='search-button-image' src={searchIcon} alt='search' />
            </button>
        </div>
    );
}

export default MovieSearch;
