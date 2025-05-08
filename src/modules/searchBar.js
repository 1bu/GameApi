import loadGameDetails from './loadGameDetails';

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

export function loadPlatforms(platforms){
    if(!platforms) return `<span><span>`
    return platforms.map(() => `<span>x</span>`).join('');
}
