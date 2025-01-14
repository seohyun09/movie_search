import React, { useState } from 'react';

import MovieSearch from '../../components/MovieSearch/MovieSearch';

function Main() {
    const [searchMovie, setSearchMovie] = useState('');

    return (
        <div>
            <MovieSearch setSearchMovie={setSearchMovie} />
        </div>
    );
}

export default Main;
