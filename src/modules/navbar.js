//import search from "../assets/magnifying-glass-solid.svg"
import { searchGames } from "./api";
import { renderGames } from "./searchBar"

function loadNavbar() {
    document.getElementById('navbar-container').innerHTML = `
        <nav class="navbar-content">
        <h1 class="navbar-title"><a href="home" data-route="home">Game Api</a></h1>
        <div class="search-bar">
            <input class="navbar" type="text" id="search-bar" placeholder="Buscar un juego...">
            <button class="search-btn" data-search="button" type="button">Click me!</button>
        </div>
        </nav>     
    `;

    const btn = document.querySelector("[data-search]");

    btn.addEventListener("click", async(e)=>{
        e.preventDefault();
        let searchResult = document.getElementById("search-bar").value.toLowerCase();

        const games = await searchGames(searchResult);
        //console.log("Resultados de la API:", games);
        renderGames(games);
        document.getElementById("search-bar").value = "";
    })

}

export default loadNavbar;
