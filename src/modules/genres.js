import {getGenres, getGamesByGenre} from './api';
import { loadGamesList } from './loadGamesList';

export async function loadGenres(){
    const genres = await getGenres();
    const content = document.getElementById('content-container');
    content.innerHTML = '';
    const header = document.createElement('h2');
    header.innerText = 'Genres';
    const container = document.createElement('div');
    container.classList = 'container'
    
    genres.forEach(genre=>{
        const gameContainer = document.createElement('div');
        gameContainer.classList = 'genres-container';
        gameContainer.setAttribute('data-genre', genre.id);
        gameContainer.innerHTML = `
            <img class="game-img" src="${genre.image_background}" alt="${genre.name}">
            <div class="data-container">
                    <a href="#">${genre.name}</a>
                    <span>Games Count ${genre.games_count}</span>
                </div>
        `;

    gameContainer.addEventListener("click", async(e)=>{
        e.preventDefault();
        const games = await getGamesByGenre(genre.id);
        loadGamesList(games, genre.name)
    });

        container.appendChild(gameContainer);
    });
    content.appendChild(header);
    content.appendChild(container);
    
    return content
}

export default loadGenres;