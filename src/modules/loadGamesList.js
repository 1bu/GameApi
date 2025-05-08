import loadGameDetails from './loadGameDetails';
import {loadPlatforms} from './searchBar';

export async function loadGamesList(games, header){
    const content = document.getElementById('content-container');
    content.innerHTML = '';
    const existingBg = document.querySelector('.background-blur');
    if (existingBg) existingBg.remove();
    const container = document.createElement('div');
    container.classList = 'container'
    const h2 = document.createElement('h2');
    h2.innerHTML = header;
    content.appendChild(h2)

    games.forEach(game=>{
        const gameContainer = document.createElement('div');
        gameContainer.classList = 'render-games';
        gameContainer.setAttribute('data-id',game.id);
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
            e.preventDefault();
            const gameId = gameContainer.dataset.id;
            loadGameDetails(gameId);
        })

        container.appendChild(gameContainer);
    }); 
        
    content.appendChild(container);
    
    return content
}

export default loadGamesList;