import { getGameById, getGameScreenshots, getPlatforms } from './api';
import { loadPlatforms } from './searchBar';

export default async function loadGameDetails(id) {
    const game = await getGameById(id);
    const screenshots = await getGameScreenshots(id);

    const platforms = await getPlatforms();

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
                        <div class="platforms">
                            ${loadPlatforms(game.platforms)}
                        </div>
                        <p>Rating: ${game.rating}</p>
                    </div>
                    <div class="img-carousel">
                        <h3>Screenshots</h3>
                        <div class="screenshots-grid"></div>
                    </div>    
                </div>

                <div class="details-info">
                    <p>Released: ${game.released}</p>
                    <p>Developers: ${game.developers.map(dev => dev.name).join(', ')}</p>
                    <p>Publisher: ${game.publishers.map(pub => pub.name).join(', ')}</p>
                    <p>Genres: ${game.genres.map(genre => genre.name).join(', ')}</p>
                    <div class="platforms">
                        <p><strong>Available on:</strong> ${game.platforms.map(p => p.platform.name).join(', ')}</p>
                    </div>
                    <p>${game.description_raw}</p>
                </div>
            </div>
        </div>
    `;

    const grid = container.querySelector('.screenshots-grid');

    if (screenshots && screenshots.length > 0) {
        const limitedScreenshots = screenshots.slice(0, 9);
        limitedScreenshots.forEach((img, index) => {
            const card = renderScreenshot(img, index, limitedScreenshots);
            grid.appendChild(card);
        });
    } else {
        const msg = document.createElement('p');
        msg.textContent = 'No screenshots available';
        grid.appendChild(msg);
    }
}

function renderScreenshot(image, index, allImages) {
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('screenshot-wrapper');
    imgWrapper.innerHTML = `<img src="${image.image}" alt="Screenshot">`;

    imgWrapper.addEventListener('click', () => {
        openImageModal(allImages, index);
    });

    return imgWrapper;
}

function openImageModal(images, startIndex = 0) {
    let currentIndex = startIndex;

    const modal = document.createElement('div');
    modal.classList.add('image-modal');

    function renderModalContent(index) {
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img src="${images[index].image}" alt="Expanded Screenshot">
                <button class="modal-nav prev">&larr;</button>
                <button class="modal-nav next">&rarr;</button>
            </div>
        `;

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

        modal.querySelector('.modal-nav.prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            renderModalContent(currentIndex);
        });

        modal.querySelector('.modal-nav.next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            renderModalContent(currentIndex);
        });
    }

    function handleKeyDown(e) {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            renderModalContent(currentIndex);
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            renderModalContent(currentIndex);
        } else if (e.key === 'Escape') {
            closeModal();
        }
    }

    function closeModal() {
        modal.remove();
        document.removeEventListener('keydown', handleKeyDown);
    }

    renderModalContent(currentIndex);
    document.body.appendChild(modal);
    document.addEventListener('keydown', handleKeyDown);
}