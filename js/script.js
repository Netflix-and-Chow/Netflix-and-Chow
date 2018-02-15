//namespace variables
const netflixChow = {};

// netflixChow.animationMovies = [];
// netflixChow.actionMovies = [];
// netflixChow.comedyMovies = [];
// netflixChow.horrorMovies = [];
// netflixChow.romanceMovies = [];
// netflixChow.SFMovies = [];
// netflixChow.westernMovies = [];

// //get data from API's
// //Genre Ids (Action - 28, Adventure - 12, Animation - 16, Comedy - 35, Crime - 80, Documentary - 99, Drama - 18, Family - 10751)
// //Genre Ids (Fantasy - 14, History - 36, Horror - 27, Music - 10402, Mystery - 9648, Romance - 10749, Science Fiction - 878)
// //Genre Ids (TV Movie - 10770, Thriller - 53, War - 10752, Western - 37)
// netflixChow.getMovieData = () => {
//     $.ajax({
//         url: "https://api.themoviedb.org/3/discover/movie",
//         method: "GET",
//         dataType: "jsonp",
//         data: {
//             api_key: "82927986e43b7cf24d8d6e29aacb0e5c",
//             with_genres:"28|16|35|878|27|10749|37",
//             language:"en-US"
//         }
//     }).then((res) => {
//         console.log(res);
//         netflixChow.sortData(res.results);
//     });
// }

// netflixChow.getMovieData();

// //sorting data accoding to genre type and filtering them into separate arrays
// netflixChow.sortData = (movieData) => {
//     netflixChow.animationMovies = movieData.filter((value) => {
//         if(value.genre_ids.includes(16)) {
//             return value;
//         }
//     });
//     console.log(netflixChow.animationMovies);

//     netflixChow.comedyMovies = movieData.filter((value) => {
//         if (value.genre_ids.includes(35)) {
//             return value;
//         }
//     });
//     console.log(netflixChow.comedyMovies);
// }

// //display sorted data
// netflixChow.displayData = () => {

// }

// //events function
// netflixChow.events = () => {

// }


//Get data notes:
//images 
//Genres: Comedy, Sci-Fi, Horror, Romance, Western, Action, Animation
//Random 5 movies with genre selection
//Figure out biography, ratings, reviews



//YUMMLY API:
// get ingredients
// get image
// get link to page
// generate 5 recipies


netflixChow.getId= (ingredient) => {
    $.ajax({
        url: 'http://api.yummly.com/v1/api/recipes',
        dataType: 'json',
        method: 'GET',
        data: {
            _app_id: "3a0b16d3",
            _app_key: 'faa48eb9d0f5e7c9d642a58e0147bc85',
            format: 'json',
            q:`${ingredient}`

        }
    }).then(function (res) {
        console.log(res.matches);
        netflixChow.ingredientMatches = res.matches;
        
        // console.log(recRandomId);
        // console.log(netflixChow.ingredientMatches[recRandomId]);
        
        const getRandomNumbers = [];
        
        for (i=0; i<5; i++) {
            let recRandomId = Math.floor(Math.random() * netflixChow.ingredientMatches.length);
            
            getRandomNumbers.push(recRandomId);
        }


    })
}



//selcted ids will be passed to getRecepie function
// retrive image and url of each id

netflixChow.getRec = (recId) => {
    $.ajax({
        url: `http://api.yummly.com/v1/api/recipe/${recId}`,
        dataType: 'json',
        method: 'GET',
        data: {
            _app_id: "3a0b16d3",
            _app_key: 'faa48eb9d0f5e7c9d642a58e0147bc85',
            format: 'json'
            
        }
    }).then(function (res) {
        
        
    })
}






//initialization function
netflixChow.init = () => {
    // netflixChow.getMovieData();
    netflixChow.getRec();
    netflixChow.getId(`garlic`);
}



// function () {
//     const ids = res.matches.map((value) => {
//         return value.id;
//     })
// }

//document ready function
$(function() {
    netflixChow.init();
});

