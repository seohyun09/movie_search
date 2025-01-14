import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MovieSearch from '../../components/MovieSearch/MovieSearch';

import { getMovieDetail } from '../../apis/MovieInfo';

function MovieDetail() {
    const movieID = useParams().id;

    useEffect(() => {
        const fetchMovieDetail = async (movieID) => {
            if (movieID) {
                const data = await getMovieDetail(movieID);
            }
        };
        fetchMovieDetail(movieID);
    }, [movieID]);

    return (
        <div>
            <MovieSearch />
        </div>
    );
}

export default MovieDetail;
