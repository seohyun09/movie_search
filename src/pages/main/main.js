import React, { useEffect, useState } from 'react';
import './main.css';

import MovieSearch from '../../components/MovieSearch/MovieSearch';
import MovieListInfo from '../../components/MovieListInfo/MovieListInfo';
import Pagination from '../../components/Pagination/Pagination';
import { getMovieList } from '../../apis/MovieInfo';

function Main() {
    const [searchMovie, setSearchMovie] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchMovieList = async (searchMovie, currentPage) => {
            if (searchMovie.trim()) {
                const data = await getMovieList(searchMovie, currentPage);
                setMovieList(data.Search || []);
                setTotalPage(Math.floor(data.totalResults / 10));
            }
        };
        fetchMovieList(searchMovie, currentPage);
    }, [searchMovie, currentPage]);

    return (
        <div>
            <MovieSearch setSearchMovie={setSearchMovie} />
            <div className='movielist-box'>
                {searchMovie && movieList.map((movie) => <MovieListInfo movie={movie} />)}
            </div>
            {searchMovie && (
                <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}
        </div>
    );
}

export default Main;
