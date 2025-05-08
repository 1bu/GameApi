import {getNewGames} from './api'
import loadGameDetails from './loadGameDetails';
import {loadPlatforms} from './searchBar';

export async function loadNewRelease() {
    const content = document.getElementById('content-container');
    content.innerHTML = '';
    const header = document.createElement('h2');
    header.innerText = 'New Releases'
    const container = document.createElement('div');
    container.classList = 'container'
    const games = await getNewGames();

    games.forEach(game=>{
        const gameContainer = document.createElement('div');
        gameContainer.classList = 'render-games';
        gameContainer.setAttribute('data-id', game.id)
        gameContainer.innerHTML = `
        <img class="game-img" src="${game.background_image}" alt="${game.name}">
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

    gameContainer.addEventListener("click", async(e)=>{
        loadGameDetails(game.id);
    }) 
        
        container.appendChild(gameContainer);
    }); 
    content.appendChild(header)
    content.appendChild(container);

    return content
}