import {getPlatforms, getAllGames} from './api'
import { loadGamesList } from './loadGamesList';

export default async function loadPlatform(){
    const content = document.getElementById('content-container');
    content.innerHTML = '';
    const header = document.createElement('h2');
    header.innerText = 'Platform';
    const container = document.createElement('div');
    container.classList.add('container')
    const platforms = await getPlatforms();
    console.log(platforms);

    platforms.forEach(platform=>{
        const platformContainer = document.createElement('div');
        platformContainer.classList.add('consoles-container'); //Cambiar por platform container
        platformContainer.setAttribute('data-id',platform.id);
        platformContainer.innerHTML = `
        <img class="game-img" src="${platform.image_background}" alt="${platform.name}">
        <div class="data-container">
            <a href="#">${platform.name}</a>
            <span>Games Count ${platform.games_count}</span>
        </div>
        `;

        platformContainer.addEventListener("click", async(e)=>{
            e.preventDefault();
            const games = await getGamesByPlatform(platform.id);
            loadGamesList(games, platform.name)
        });   
        
        
        container.appendChild(platformContainer);
    });
    content.appendChild(header); 
    content.appendChild(container);

    return content
}

async function getGamesByPlatform(platformId){
    const allGames = await getAllGames(platformId);

    const filteredGames = allGames.filter(game =>
        game.platforms?.some(p => p.platform.id === platformId)
    );
    console.log(filteredGames);

    return filteredGames;
}