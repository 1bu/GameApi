import loadHome from './home';
import loadPlatform from './platforms';
import loadGenres from './genres';
import loadPopular from './popularGames';
import { loadNewRelease } from './release';

const routes = {
    'home': loadHome,
    'platforms': loadPlatform,
    'genres': loadGenres,
    'top-games': loadPopular,
    'new-releases': loadNewRelease
};

function navigateTo(route){
    const existingBg = document.querySelector('.background-blur');
    if (existingBg) existingBg.remove();

    if(routes[route]){
        document.getElementById('content-container').innerHTML = '';
        routes[route]();
    }
}

document.addEventListener('click', (event) => {
    if (event.target.matches('[data-route]')) {
        event.preventDefault();
        navigateTo(event.target.dataset.route);
    }
});

export default navigateTo;