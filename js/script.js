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
            page:100
        }
    }).then((res) => {
        // console.log(res);
        netflixChow.sortMovieData(res.results);
        // console.log(res.results);
    });
}

netflixChow.sortMovieData = (movieData) => {
    // console.log(movieData);    

    for (let i = 0; i < 5; i = i + 1) {
        let randomMovieIndex = Math.floor(Math.random() * 5);
        netflixChow.randomMovieArray.push(randomMovieIndex);
    }

    for (let i = 0; i < netflixChow.randomMovieArray.length; i = i + 1) {
        netflixChow.movieGenre.push(movieData[netflixChow.randomMovieArray[i]]);
    }

    netflixChow.displayMovies(netflixChow.movieGenre);

}

// netflixChow.getMovieData();
// netflixChow.randomizer();

netflixChow.movieSelection = () => {
    // console.log(randomMovieIndex);
    $("form").on("submit", function(e) {
        e.preventDefault();
        const userInputMovie = $("input[type=radio]:checked").val();
        console.log(userInputMovie);

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

        //passing genreId to the getMovieData function to retrieve movies
        netflixChow.getMovieData(genreId);
        netflixChow.movieFood(genreId);

        //clears array at the end of the submit and after the for loop has ran and pushed random numbers, also clears the radio button selection
        $("input[type=radio]").prop("checked", false);
        netflixChow.movieGenre=[];
        netflixChow.randomMovieArray = [];

        //clears the previous results appended to the body
        $(".results").empty();
    });
};

// netflixChow.movieSelection();

//display sorted data
netflixChow.displayMovies = (movieData) => {
    console.log(movieData);

    for(let i = 0; i < movieData.length; i = i + 1) {
        const movieTitle = $(".movie-results").append(`<h2>${movieData[i].original_title}</h2>`);
        const movieDescription = $(".movie-results").append(`<p>${movieData[i].overview}</p>`);
        const movieImage = $(".movie-results").append(`<img src="https://image.tmdb.org/t/p/w500${movieData[i].poster_path}">`);
    }

}


netflixChow.movieFood = (genreID) => {
    if (genreID === 16) {
        const assignedIngredient = 'chicken fingers';
    }

    else if (genreID === 18) {
        const assignedIngredient = 'soup';
    }

    else if (genreID === 35) {
        const assignedIngredient = 'popcorn';
    }

    else if (genreID === 27) {
        const assignedIngredient = 'garlic';
    }

    else if (genreID === 10749) {
        const assignedIngredient = 'dessert';
    }

    else if (genreID === 878) {
        const assignedIngredient = 'drinks';
    }

    else {
        const assignedIngredient = 'bbq';
    }

    netflixChow.getId(assignedIngredient);
}



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
        netflixChow.ingredientMatches = res.matches;
        // console.log(netflixChow.ingredientMatches);
        
        // console.log(recRandomId);
        // console.log(netflixChow.ingredientMatches[recRandomId]);
        
        let getRandomNumbers = [];
        let getRandomRecipes = [];
        
        for (i=0; i<5; i++) {
            let recRandomId = Math.floor(Math.random() * netflixChow.ingredientMatches.length);
            
            getRandomNumbers.push(recRandomId);
        }

        // console.log(getRandomNumbers);

        for(let i =0; i < getRandomNumbers.length; i = i + 1) {
            getRandomRecipes.push(netflixChow.ingredientMatches[getRandomNumbers[i]]);
        }

        // console.log(getRandomRecipes);
        let getRandomId = getRandomRecipes.map((value) => value.id);
        // console.log(getRandomId);

        getRandomId = getRandomId.map(netflixChow.getRec);
        // console.log(getRandomId);
        
        $.when(...getRandomId)
            .then((...recipeDetails) => {
                recipeDetails = recipeDetails.map((value) => value[0]);
                // console.log(recipeDetails);
                netflixChow.getRecipes(recipeDetails);
            })
    })
};


netflixChow.getRec = (recId) => {
    return $.ajax({
        url: `http://api.yummly.com/v1/api/recipe/${recId}`,
        dataType: 'json',
        method: 'GET',
        data: {
            _app_id: "3a0b16d3",
            _app_key: 'faa48eb9d0f5e7c9d642a58e0147bc85',
            format: 'json'
        }
    });
}


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
   
    netflixChow.displayRecipes(recipeName, recipeUrl, recipeImage); 
    }


netflixChow.displayRecipes = (recipeName, recipeUrl, recipeImage) => {
    // console.log(recipeName[0], recipeUrl[0], recipeImage[0])

    $('.movie-choice').on('click', function(){
        for (i=0; i<5; i++){
        $('.recipe-gallery').append(`<li>${recipeName[i]},</li>`);
        $('.recipe-gallery').append(`<a href="${recipeUrl[i]}"></a>`);
        $('.recipe-gallery').append(`<img src="${recipeImage[i]}">`);
        }
    });

}



//initialization function
netflixChow.init = () => {
    netflixChow.movieSelection();
}


//document ready function
$(function() {
    netflixChow.init();
});
