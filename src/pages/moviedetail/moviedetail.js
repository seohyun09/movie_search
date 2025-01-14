import React from 'react';
import { useParams } from 'react-router-dom';

import MovieSearch from '../../components/MovieSearch/MovieSearch';

function MovieDetail() {
    const movieID = useParams().id;

    return (
        <div>
            <MovieSearch />
        </div>
    );
}

export default MovieDetail;
