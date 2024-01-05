const key = "04fa256cd04d0ef51e9c87406d60e6e9";

const genreId = 27;

const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
    requestHorror: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${genreId}` ,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
    // requestHorrors: `https://api.themoviedb.org/3/movie?api_key=${key}&language=en-US&query=horror&page=1&include_`,
    
}

export default requests;