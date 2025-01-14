import React, { useEffect, useState } from 'react';

import MovieSearch from '../../components/MovieSearch/MovieSearch';
import { getMovieList } from '../../apis/MovieInfo';

function Main() {
    const [searchMovie, setSearchMovie] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const fetchMovieList = async (searchMovie) => {
            if (searchMovie.trim()) {
                const data = await getMovieList(searchMovie);
                setMovieList(data.Search || []);
                setTotalPage(Math.floor(data.totalResults / 10));
            }
        };
        fetchMovieList(searchMovie);
    }, [searchMovie]);

    return (
        <div>
            <MovieSearch setSearchMovie={setSearchMovie} />
        </div>
    );
}

export default Main;
