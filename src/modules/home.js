import {getRandomTopGame, getPopularGames, getNewGames} from './api';
import {loadPlatforms} from './searchBar';
import {loadCarousel} from './carousel';
import loadGameDetails from './loadGameDetails';

export async function loadHome(){
    const content = document.getElementById('content-container');
    content.innerHTML = '';
    const randomGame = await getRandomTopGame()
    const popularGame = await getPopularGames()
    const latestGames = await getNewGames();
    //console.log(latestGames);

    const popularCarrousel = loadCarousel(popularGame,renderGames);
    const latestCarousel = loadCarousel(latestGames,renderGames);

    content.innerHTML = `
            <div class="hero-container">
                <img src="${randomGame.background_image}" alt="${randomGame.name}">
                <h2>${randomGame.name}</h2> 
            </div>

            <div class="game-slide-container">
                <div class="new-release-container">
                    <h2><a href="new-releases" data-route="new-releases">New Releases</a></h2>
                </div>
                <div class="popular-container">
                    <h2><a href="top-games" data-route="top-games">Top Popular</a></h2>
                </div>
    </div>
    `;
    document.querySelector('.popular-container').appendChild(popularCarrousel);
    document.querySelector('.new-release-container').appendChild(latestCarousel);

    const hero = document.querySelector('.hero-container');
    hero.addEventListener("click", async(e)=>{
        e.preventDefault();
        loadGameDetails(randomGame.id);
    })
}


function renderGames(game){
    const card = document.createElement('div');
    card.classList.add('render-games');
    card.innerHTML = `
        <img src="${game.background_image}" alt="${game.name}";">
        <div class="games-data">
            <div class="platforms">
                ${loadPlatforms(game.platforms)}
            </div>
            <span>${game.metacritic !== null ? game.metacritic : 'N/A'}</span>
            <a href="#">${game.name}</a>
            <span>Rating: ${game.rating}</span>
            <span>Released: ${game.released}</span>
        </div>
    `;

    card.addEventListener("click", async(e)=>{
        e.preventDefault();
        loadGameDetails(game.id);
    })    

    return card;
}

export default loadHome;