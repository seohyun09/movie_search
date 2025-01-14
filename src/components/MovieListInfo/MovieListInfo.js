import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieListInfo.css';

function MovieListInfo({ movie }) {
    const [isHovering, setIsHovering] = useState(false);
    const navigate = useNavigate();

    const handleMovieClick = () => {
        navigate(`/moviedetail/${movie.imdbID}`);
    };

    return (
        <div
            className='movielist-container'
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
            onClick={handleMovieClick}
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
