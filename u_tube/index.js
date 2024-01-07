// You are expected to handle the potential errors that might come up while fetching the data from. the API. For exampleInvalid API Key: Provide a clear error message if the API key is 
// invalid.Movie
//  Not Found: Show a user-friendly message if the movie they're searching for doesn't exist. 



// Develop a feature that allows users to select "Add to Favorites" after searching for a movie. This action should add the movie to their favorites list, display it on the user interface, and also save it persistently in local storage. 


// Add a button to clear all favorite movies from the local storage and the UI. 


const fetchMovieBtn = document.getElementById("fetchMovie");
const movieInput = document.getElementById("movieInput");
const movieDisplay = document.getElementById("movieDisplay");
const addFavoriteBtn = document.getElementById("addFavorite");
const favoritesList = document.getElementById("favoritesList");
const clear = document.getElementById("clearBtn")

const API_KEY = "b3f0cf09";

fetchMovieBtn.addEventListener("click", fetchMovie);

let currentMovie = null;

let favourites = [];

let list;

function fetchMovie() {
  const movieTitle = movieInput.value.trim();
  fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
      if (data.Response === "True") {
        currentMovie = {
          title: data.Title,
          year: data.Year,
          plot: data.Plot
        };
        movieDisplay.innerHTML = `
                    <h3>${data.Title} (${data.Year})</h3>
                    <p>${data.Plot}</p>
                `;
      }else if(data.Response == "False" || data.Error == "Invalid API Key" ){
        movieDisplay.innerText = "Invalid API Key"
      }
      
      else {
        movieDisplay.innerText = data.Error;
      }
    });
} 

addFavoriteBtn.addEventListener("click",()=>{


 list = document.createElement("li");
list.innerText = `${currentMovie.title}`;
favoritesList.appendChild(list);

localStorage.setItem(JSON.stringify("list",currentMovie.title));
})


clear.addEventListener("click",()=>{
list.remove();
localStorage.clear();

})



class Polygon {
    constructor() {
    console.log("I'm a Polygon");
    }
    }
    class Triangle extends Polygon {
    constructor() {
    console.log("I have 3 sides");
    super();
    }
    }
    const shape = new Triangle();



    function outer(callback) {
        console.log("Outer start");

        setTimeout(function() {
        console.log("Inner timeout");
        callback();
        }, 1000);
        }

        outer(function() {
        console.log("Callback executed");
        }); //Outer start
       // Inner timeout
       // Callback executed
        

        
