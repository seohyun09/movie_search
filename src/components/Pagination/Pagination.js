import React, { useState, useEffect } from 'react';
import './Pagination.css';

function Pagination({ totalPage, currentPage, setCurrentPage }) {
    const [pages, setPages] = useState([]);
    const [pageGroup, setPageGroup] = useState(1);

    useEffect(() => {
        const last = Math.min(pageGroup * 10, totalPage);
        const first = Math.max(1, pageGroup * 10 - 10 + 1);

        const newPages = [];
        for (let i = first; i <= last; i++) {
            newPages.push(i);
        }
        setPages(newPages);
    }, [totalPage, pageGroup]);

    const handlePrev = () => {
        if (pageGroup === 1) return;
        setPageGroup(pageGroup - 1);
    };

    const handleNext = () => {
        if (pageGroup === Math.ceil(totalPage / 10)) return;
        setPageGroup(pageGroup + 1);
    };

    return (
        <div className='pagination-conatiner'>
            <li className='pagination-button' onClick={handlePrev}>
                {'<'}
            </li>
            {pages.map((page) => (
                <li
                    className={page === currentPage ? 'pagination-li-active' : 'pagination-li'}
                    onClick={() => setCurrentPage(page)}
                >
                    <a>{page}</a>
                </li>
            ))}
            <li className='pagination-button' onClick={handleNext}>
                {'>'}
            </li>
        </div>
    );
}

export default Pagination;
