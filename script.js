const API_KEY = "73514c9c6af44aceec8bdb947f0df9fa";

const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE ="https://image.tmdb.org/t/p/w500";

// ENDPOINT = /movie/top_rated



const searchInput= document.getElementById("searchInput")


const searchBtn= document.getElementById("searchBtn")


const message=document.getElementById("message")

const mainContainer=document.getElementById("mainContainer")

getMovies();

// ${BASE_URL}/search/movie?api_key=${API_KEY}&query=${}


async function getMovies(){
    try{
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)

    const data = await response.json()


    console.log(data.results)

    displayMovie(data.results)

    }catch(error){
        console.log(error)
    }


}
async function searchMovie(){
    const movieName = searchInput.value.trim();

    if(movieName===""){
        message.innerText="Please enter a movie name.";
        return;
    }

    message.innerText="";

    try{
        const response= await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`);


        const data = await response.json();

        if(data.results.length === 0){
            message.innerText="Movie not found.";
            mainContainer.innerHTML="";
            return;
        }

        displayMovie(data.results);  
        searchInput.value=""; 

    }catch(error){
        console.log(error);
        message.innerText="Something went wrong."
    }
}

searchBtn.addEventListener("click", searchMovie);

searchInput.addEventListener("keypress", (e)=>{
    if(e.key==="Enter"){
        searchMovie();
    }
})


function displayMovie(movies){
    mainContainer.innerHTML="";

    movies.forEach(movie => {
        const card = document.createElement("div")

        const poster = IMAGE + movie.poster_path;

        card.innerHTML=`
        <img src="${poster}"/>
        
        <p>${movie.title}</p>

        <p>${movie.release_date}</p>

        <p class="rating">${movie.vote_average}</p>
        `
        
        mainContainer.appendChild(card)
    });
}
