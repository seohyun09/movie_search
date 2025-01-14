import React, { useEffect, useState } from 'react';
import './main.css';

import MovieSearch from '../../components/MovieSearch/MovieSearch';
import MovieListInfo from '../../components/MovieListInfo/MovieListInfo';
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
            <div className='movielist-box'>
                {searchMovie && movieList.map((movie) => <MovieListInfo movie={movie} />)}
            </div>
        </div>
    );
}

export default Main;
