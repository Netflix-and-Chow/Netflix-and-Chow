//namespace variables
const netflixChow = {};

netflixChow.animationMovies = [];
netflixChow.actionMovies = [];
netflixChow.comedyMovies = [];
netflixChow.horrorMovies = [];
netflixChow.romanceMovies = [];
netflixChow.SFMovies = [];
netflixChow.westernMovies = [];

//get data from API's
//Genre Ids (Action - 28, Adventure - 12, Animation - 16, Comedy - 35, Crime - 80, Documentary - 99, Drama - 18, Family - 10751)
//Genre Ids (Fantasy - 14, History - 36, Horror - 27, Music - 10402, Mystery - 9648, Romance - 10749, Science Fiction - 878)
//Genre Ids (TV Movie - 10770, Thriller - 53, War - 10752, Western - 37)
netflixChow.getMovieData = () => {
    $.ajax({
        url: "https://api.themoviedb.org/3/discover/movie",
        method: "GET",
        dataType: "jsonp",
        data: {
            api_key: "82927986e43b7cf24d8d6e29aacb0e5c",
            with_genres:"28|16|35|878|27|10749|37",
            language:"en-US"
        }
    }).then((res) => {
        console.log(res);
        netflixChow.sortData(res.results);
    });
}

// netflixChow.getMovieData();

//sorting data accoding to genre type and filtering them into separate arrays
netflixChow.sortData = (movieData) => {
    netflixChow.animationMovies = movieData.filter((value) => {
        if(value.genre_ids.includes(16)) {
            return value;
        }
    });
    console.log(netflixChow.animationMovies);

    netflixChow.comedyMovies = movieData.filter((value) => {
        if (value.genre_ids.includes(35)) {
            return value;
        }
    });
    console.log(netflixChow.comedyMovies);
}

//display sorted data
netflixChow.displayData = () => {

}

//events function
netflixChow.events = () => {

}

//initialization function
netflixChow.init = () => {

}

//document ready function
$(function() {
    netflixChow.getMovieData();
});



//YUMMLY API:
// get ingredients
// get image
// get link to page
// generate 5 recipies


horror - beef, steak

comedy - 





//Get data notes:
//images 
//Genres: Comedy, Sci-Fi, Horror, Romance, Western, Action, Animation
//Random 5 movies with genre selection
//Figure out biography, ratings, reviews

