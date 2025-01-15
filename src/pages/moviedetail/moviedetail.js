import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './moviedetail.css';

import { getMovieDetail } from '../../apis/MovieInfo';

function MovieDetail() {
    const movieID = useParams().id;
    const [movieContent, setMovieContent] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieDetail = async (movieID) => {
            setIsLoading(true);
            if (movieID) {
                const data = await getMovieDetail(movieID);
                setMovieContent(data);
                setIsLoading(false);
            }
        };
        fetchMovieDetail(movieID);
    }, [movieID]);

    return (
        <div className='moviedetail-box'>
            {isLoading && (
                <div className='loading'>
                    <p>Loading . . .</p>
                </div>
            )}
            {!isLoading && (
                <div>
                    <button className='moviedetail-button' onClick={() => navigate(-1)}>
                        {'<'}뒤로가기
                    </button>
                    <div className='moviedetail-container'>
                        <img className='moviedetail-image' src={movieContent?.Poster} />

                        <div className='moviedetail-contents'>
                            <h1>{movieContent?.Title}</h1>
                            <p>
                                {movieContent?.Genre} / {movieContent?.Year}
                            </p>
                            <hr />
                            <h3>상영시간</h3>
                            <p>{movieContent?.Runtime}</p>
                            <h3>감독</h3>
                            <p>{movieContent?.Director}</p>
                            <h3>배우</h3>
                            <p>{movieContent?.Actors}</p>
                            <h3>줄거리</h3>
                            <p>{movieContent?.Plot}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetail;
