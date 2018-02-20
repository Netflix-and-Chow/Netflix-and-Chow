//namespace variables                      
const netflixChow = {};

netflixChow.movieGenre = [];
netflixChow.randomMovieArray = [];

//get data from API's
//Genre Ids (Action - 28, Adventure - 12, Animation - 16, Comedy - 35, Crime - 80, Documentary - 99, Drama - 18, Family - 10751)
//Genre Ids (Fantasy - 14, History - 36, Horror - 27, Music - 10402, Mystery - 9648, Romance - 10749, Science Fiction - 878)
//Genre Ids (TV Movie - 10770, Thriller - 53, War - 10752, Western - 37)
netflixChow.getMovieData = (id) => {
    $.ajax({
        url: "https://api.themoviedb.org/3/discover/movie",
        method: "GET",
        dataType: "jsonp",
        data: {
            api_key: "82927986e43b7cf24d8d6e29aacb0e5c",
            with_genres:id,  
            language:"en-US",
            page:1,
            "release_date.gte":2010
        }
    }).then((res) => {
        // console.log(res);
        netflixChow.sortMovieData(res.results);
        // console.log(res.results);
    });
}

netflixChow.sortMovieData = (movieData) => {
  
    //infinite loop is built on purpose - we are pushing random numbers to any array only if they are unique, break at array length of 5
    for (let i = 0; i < 5; i + 1) {

        let randomMovieIndex = Math.floor(Math.random() * movieData.length);
        
        if(netflixChow.randomMovieArray.includes(randomMovieIndex)) {
            // console.log(netflixChow.randomMovieArray);
        }
        else {            
            netflixChow.randomMovieArray.push(randomMovieIndex);
        }
        if(netflixChow.randomMovieArray.length === 5) {
            break;
        }
    }

    //pushes movies into an array based on an array of random index numbers
    for (let i = 0; i < netflixChow.randomMovieArray.length; i = i + 1) {
        netflixChow.movieGenre.push(movieData[netflixChow.randomMovieArray[i]]);
    }

    netflixChow.displayMovies(netflixChow.movieGenre);
    // console.log(netflixChow.movieGenre);
}


netflixChow.movieSelection = () => {
    
    $("form").on("submit", function(e) {
        e.preventDefault();
        let userInputMovie = $("input[type=radio]:checked").val();


        //clears the previous results appended to the body
        $(".movie-card").remove();
        $(".recipe-card").remove();

        let genreId;

        if(userInputMovie === "Animation") {
            genreId = 16; 
        }
        else if(userInputMovie === "Drama") {
            genreId = 18;
        }
        else if(userInputMovie === "Comedy") {
            genreId = 35;
        }
        else if(userInputMovie === "Horror") {
            genreId = 27;
        }
        else if(userInputMovie === "Romance") {
            genreId = 10749;
        }
        else if(userInputMovie === "Sci-Fi") {
            genreId = 878;
        }
        else if(userInputMovie === "Western") {
            genreId = 37;
        }

        // console.log(genreId);

        //passing genreId to the getMovieData function to retrieve movies and movieFood function for recipe retrieval
        netflixChow.getMovieData(genreId);
        netflixChow.movieFood(genreId);
        

        //clears array at the end of the submit and after the for loop has ran and pushed random numbers, also clears the radio button selection
        $("input[type=radio]").prop("checked", false);
        netflixChow.movieGenre=[];
        netflixChow.randomMovieArray = [];

        // $(".movie-results").empty();
        // $(".recipe-results").empty();

    });
};


//display sorted data
netflixChow.displayMovies = (movieData) => {
    // console.log(movieData);

    for(let i = 0; i < movieData.length; i = i + 1) {

        $(".movie-results").append(`
                <div class="movie-card">
                    <img src="https://image.tmdb.org/t/p/w500${movieData[i].poster_path}">
                    <div class="movieOverlay">
                        <h3>${movieData[i].original_title}</h3>
                        <p class="description">${movieData[i].overview}<p>
                    </div>
                    <div class="readMore clearfix">
                        <p>Read more</p>
                        <i class="fas fa-plus-circle"></i>
                    </div>
                </div>
        `);
    }
    $(".movie-results").flickity("destroy");
    netflixChow.flickityMovie();
    netflixChow.readMore();
}


netflixChow.movieFood = (genreID) => {
    let assignedIngredient;
    
    if (genreID === 16) {
        assignedIngredient = 'chicken fingers';
    }

    else if (genreID === 18) {
        assignedIngredient = 'soup';
    }

    else if (genreID === 35) {
        assignedIngredient = 'popcorn';
    }

    else if (genreID === 27) {
        assignedIngredient = 'garlic';
    }

    else if (genreID === 10749) {
        assignedIngredient = 'dessert';
    }

    else if (genreID === 878) {
        assignedIngredient = 'drinks';
    }

    else {
        assignedIngredient = 'bbq';
    }

    netflixChow.getId(assignedIngredient);
}


//pulls API data from Yummly based on the assigned Ingredient --> linked to movie genre IDs
netflixChow.getId= (ingredient) => {
    $.ajax({
        url: 'https://api.yummly.com/v1/api/recipes',
        dataType: 'json',
        method: 'GET',
        data: {
            _app_id: "3a0b16d3",
            _app_key: 'faa48eb9d0f5e7c9d642a58e0147bc85',
            format: 'json',
            q:`${ingredient}`

        }

    }).then(function (res) {
        netflixChow.ingredientMatches = res.matches;
        
        let getRandomNumbers = [];
        let getRandomRecipes = [];
        
        //forced infinite loop with a break - it makes sure the array is limited to 5 elements and are unique
        for (let i = 0; i < 5; i + 1) {
            
            let recRandomId = Math.floor(Math.random() * netflixChow.ingredientMatches.length);

            if (getRandomNumbers.includes(recRandomId)) {
                // console.log(netflixChow.randomMovieArray);
            }
            else {
                getRandomNumbers.push(recRandomId);
            }
            if (getRandomNumbers.length === 5) {
                break;
            }
        }

        //pushes recipes into an array based on an array of random index numbers
        for(let i = 0 ; i < getRandomNumbers.length; i = i + 1) {
            getRandomRecipes.push(netflixChow.ingredientMatches[getRandomNumbers[i]]);
        }


        let getRandomId = getRandomRecipes.map((value) => value.id);
        getRandomId = getRandomId.map(netflixChow.getRec);
        
        // console.log(getRandomId);

        $.when(...getRandomId)
            .then((...recipeDetails) => {
                // console.log(recipeDetails);
                recipeDetails = recipeDetails.map((value) => value[0]);
                netflixChow.getRecipes(recipeDetails);
            })
    })
}


netflixChow.getRec = (recId) => {
    return $.ajax({
        url: `https://api.yummly.com/v1/api/recipe/${recId}`,
        dataType: 'json',
        method: 'GET',
        data: {
            _app_id: "3a0b16d3",
            _app_key: 'faa48eb9d0f5e7c9d642a58e0147bc85',
            format: 'json'
        }
    });
}

//qsorts through recpies from api to get info info that is shown on page
netflixChow.getRecipes = (recipeInfo) => {
    // console.log(recipeInfo);
    
    let recipeName = recipeInfo.map((value) => {
        return value.name;
    });
    // console.log(recipeName);

    let recipeUrl = recipeInfo.map((value) => {
        return value.source.sourceRecipeUrl;
    });
    // console.log(recipeUrl);
    
    let recipeImage = recipeInfo.map((value) => {
        // console.log(value);
        return value.images[0].hostedLargeUrl;
    });
    // console.log(recipeImage)

    let recipeIngredientList = recipeInfo.map((value) => {
        // console.log(value);
        return value.ingredientLines;
    });
   
    netflixChow.displayRecipes(recipeName, recipeUrl, recipeImage, recipeIngredientList); 

    }


netflixChow.displayRecipes = (recipeName, recipeUrl, recipeImage, recipeIngredientList) => {
    // console.log(recipeIngredientList);

    $('.recipe-button').on('click', function(){
        $(".recipe-results").flickity("destroy");
        $(".recipe-card").remove();
        $(".recipe-results").empty();
        for (let i = 0; i < 5; i++){
            $('.recipe-results').append(`
            <div class ="recipe-card">
                <img src="${recipeImage[i]}">
                <div class="recipe-label">
                    <h3>${recipeName[i]}</h3>
                    <p><strong>Ingredients:</strong> ${recipeIngredientList[i]}</p>
                    <a class="link" href="${recipeUrl[i]}">See Full Recipe
                      <img src="./assets/spoon.png" alt="">
                    </a>
                </div>
            </div>`
            );

            // for (let j = 0; j < recipeIngredientList[i].length; j = j + 1) {


            //     //only append if the ingredients are unique
            //     if(recipeIngredientList[i][j] !== recipeIngredientList[i][j-1]) {
            //         $(".recipe-results").append(`
            //            <p>${recipeIngredientList[i][j]}</p>
            //            `);
            //     }
            // }


            //     //only append if the ingredients are unique
            //     if(recipeIngredientList[i][j] !== recipeIngredientList[i][j-1]) {
            //         $(".recipe-results").append(`
            //            <p>${recipeIngredientList[i][j]}</p>
            //            `);
            //     }
            // }

            }
        netflixChow.flickityRecipe();
    });
}


netflixChow.smoothScroll = () => {
    //smooth scroll code for submit buttons
    // $("form input[type=radio]").on("click", function() {
    //     $("html").animate({
    //         scrollTop: $(".movie-button").offset().top
    //     }, 700);
    // })


    $(".movie-button").on("click", function () {
        $("html").animate({
            scrollTop: $(".movies").offset().top
        }, 700);
    });

    $(".recipe-button").on("click", function () {
        $("html").animate({
            scrollTop: $(".recipes").offset().top
        }, 1000);
    });

    $(".reset").on("click", function() {
        $("html").animate({ scrollTop: 0 }, "slow");
        // window.location.reload(true);
    });
}

netflixChow.flickityGenre = function () {
    $('.genre-list').flickity({
        // cellAlign: 'left',
        contain: true,
        pageDots: false,
        wrapAround: true
    });

}

netflixChow.flickityMovie = function () {
    $('.movie-results').flickity({
        cellAlign: 'left',
        contain: true,
        pageDots: false,
        wrapAround: true
    });
    
}

netflixChow.flickityRecipe = function () {
    $('.recipe-results').flickity({
        contain: true,
        pageDots: false,
        wrapAround: true
    });
   
}

netflixChow.readMore = function () {
    $('.readMore').on('click', function () {
        // console.log('click');
        $('.movieOverlay').toggleClass('expand');
    });
}


//initialization function
netflixChow.init = () => {
    netflixChow.movieSelection();
    netflixChow.smoothScroll();
    netflixChow.flickityGenre();
    
}


//document ready function
$(function() {
    netflixChow.init();
});
