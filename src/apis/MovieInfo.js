const key = process.env.REACT_APP_API_KEY;

export const getMovieList = async (searchMovie, currentPage) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${searchMovie}&page=${currentPage}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Fetch 에러', error);
    }
};

export const getMovieDetail = async (movieID) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${movieID}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Fetch 에러', error);
    }
};
