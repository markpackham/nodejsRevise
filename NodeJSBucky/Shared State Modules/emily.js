var movies = require('./movies');

var emilysMovies = movies();
emilysMovies.favMovie = "The Notebook";
console.log("Her fav movie is "+emilysMovies.favMovie);