import React from 'react';
import './MovieListInfo.css';

function MovieListInfo({ movie }) {
    return (
        <div className='movielist-container'>
            <img className='movielist-image' src={movie.Poster} />
            <p className='movielist-title'>{movie.Title}</p>
        </div>
    );
}

export default MovieListInfo;
