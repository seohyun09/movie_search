import React, { useState } from 'react';
import './MovieListInfo.css';

function MovieListInfo({ movie }) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div
            className='movielist-container'
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
        >
            {isHovering && (
                <div className='movielist-hover'>
                    <p>{movie.Title}</p>
                    <p>{movie.Year}</p>
                </div>
            )}
            <img className='movielist-image' src={movie.Poster} />
            <p className='movielist-title'>{movie.Title}</p>
        </div>
    );
}

export default MovieListInfo;
