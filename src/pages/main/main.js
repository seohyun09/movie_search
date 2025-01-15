import React, { useEffect, useState } from 'react';
import './main.css';

import MovieListInfo from '../../components/MovieListInfo/MovieListInfo';
import Pagination from '../../components/Pagination/Pagination';
import { getMovieList } from '../../apis/MovieInfo';

function Main({ searchMovie, setSearchMovie }) {
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
            {searchMovie && (
                <>
                    <div className='movielist-box'>
                        {movieList.map((movie) => (
                            <MovieListInfo movie={movie} setSearchMovie={setSearchMovie} />
                        ))}
                    </div>
                    {movieList.length > 0 && (
                        <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    )}
                </>
            )}
        </div>
    );
}

export default Main;
