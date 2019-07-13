var movies = require('./movies');

var buckysMovie = movies();
buckysMovie.favMovie = "Good Will Hunting";
console.log("His fav movie is "+buckysMovie.favMovie);