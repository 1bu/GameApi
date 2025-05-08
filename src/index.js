import './style.css';
import loadNavbar from './modules/navbar.js';
import loadSidebar from './modules/sidebar.js';
//import renderGames from './modules/home.js';
import navigateTo from './modules/router.js';

document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadSidebar();
    navigateTo('home');
});