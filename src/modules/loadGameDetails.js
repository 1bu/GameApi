import { getGameById, getGameScreenshots } from './api';
import {loadPlatforms} from './searchBar';
import {loadCarousel} from './carousel';

export default async function loadGameDetails(id) {
    const game = await getGameById(id);
    const screenshots = await getGameScreenshots(id);

    console.log(screenshots);
    const container = document.getElementById('content-container');

    const existingBg = document.querySelector('.background-blur');
    const main = document.querySelector('#main-container');
    if (existingBg) existingBg.remove();

    const blurBg = document.createElement('div');
    blurBg.classList.add('background-blur');
    blurBg.style.backgroundImage = `url('${game.background_image}')`;
    main.appendChild(blurBg);
    
    container.innerHTML = `
    <div class="game-detail">
        <div class="game-detail-overlay"></div>
        <div class="details-content">
            <div class="details-hero"> 
                <div class="details-title">
                    <h2>${game.name}</h2>
                    <p>Rating: ${game.rating}</p>
                </div>
                <div class="img-carousel">
                    <h3>Screenshots</h3>
                </div>    
            </div>

            <div class="details-info">
                <p>Released: ${game.released}</p>
                <p>Developers: ${game.developers.map(dev => dev.name).join(', ')}</p>
                <p>Publisher: ${game.publishers.map(pub => pub.name).join(', ')}</p>
                <p>Genres: ${game.genres.map(genre => genre.name).join(', ')}</p>
                <div class="platforms">
                    ${loadPlatforms(game.platforms)}
                </div>
                <p>${game.description_raw}</p>
            </div>
        </div>
    </div>
`;

if (screenshots && screenshots.length > 0) {
    const carousel = loadCarousel(screenshots, renderScreenshot);
    document.querySelector('.img-carousel').appendChild(carousel);
} else {
    const noScreenshotsMsg = document.createElement('p');
    noScreenshotsMsg.textContent = 'No screenshots available.';
    noScreenshotsMsg.classList.add('no-screenshots-msg');
    document.querySelector('.img-carousel').appendChild(noScreenshotsMsg);
}
    
}

function renderScreenshot(image) {
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('screenshot-wrapper');
    imgWrapper.innerHTML = `<img src="${image.image}" alt="Screenshot">`;
    return imgWrapper;
}