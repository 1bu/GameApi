import loadGameDetails from './loadGameDetails';
import {getPlatformsIcons} from './getPlatformIcons';

export function renderGames(games) {
    const content = document.getElementById('content-container');
    content.innerHTML = '';
    const container = document.createElement('div');
    container.classList = 'container'

    games.forEach(game => {
        const gameContainer = document.createElement('div');
        gameContainer.classList = 'render-games';
        gameContainer.innerHTML = `
        <img class="game-img" src="${game.background_image}" alt="${game.name}">
        <div class="data-container">
                <div class="platforms">
                    ${loadPlatforms(game.platforms)}
                </div>
                <span>${game.metacritic !== null ? game.metacritic : 'N/A'}</span>
            <a href="#">${game.name}</a>
            <span>Rating: ${game.rating}</span>
            <span>Released: ${game.released}</span>
        </div>
        `;
        container.appendChild(gameContainer);

        gameContainer.addEventListener('click', async(e)=>{
            loadGameDetails(game.id);
        })
    }); 
    content.appendChild(container);
}

function normalizeConsoleFamily(name) {
    if (!name) return null;
    const lower = name.toLowerCase();
    if (lower.includes('playstation')) return 'playstation';
    if (lower.includes('xbox')) return 'xbox';
    if (lower.includes('nintendo')) return 'nintendo';
    return name; // otras plataformas se consideran únicas
}

export function loadPlatforms(platforms) {
    if (!platforms) return '<span></span>';

    const seenFamilies = new Set();

    const unique = platforms.filter(p => {
        const name = p.platform?.name;
        const normalized = normalizeConsoleFamily(name);
        if (seenFamilies.has(normalized)) return false;
        seenFamilies.add(normalized);
        return true;
    });

    return unique
        .map(p => getPlatformsIcons(p.platform?.name))
        .join('');
}

