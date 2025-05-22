import {getGenres, getGamesByGenre} from './api';
import { loadGamesList } from './loadGamesList';

export async function loadSidebar() {
    const genres = await getGenres();
    //console.log(genres);

    document.getElementById('sidebar-container').innerHTML = `
        <nav class="sidebar">
            <div><a href="home" data-route="home">Home</a></div>
            <div><a href="new-releases" data-route="new-releases">New Releases</a></div>
            <div><a href="top-games" data-route="top-games">Top Popular</a></div>
            <div><a href="platforms" data-route="platforms">Platforms</a></div>
            <div>
                <a href="genres" data-route="genres">Genres</a>
                <ul class="genre-item">
                    <li><a href="#" data-genre="${genres[0].id}">${genres[0].name}</a></li>
                    <li><a href="#" data-genre="${genres[1].id}">${genres[1].name}</a></li>
                    <li><a href="#" data-genre="${genres[2].id}">${genres[2].name}</a></li>
                    <li class="genres-toggle-container">
                        <button class='genres-btn'>Show All</button>    
                    </li>
                </ul>
            </div>
        </nav>    
    `;

    const btn = document.querySelector('.genres-btn');
    let expanded = false;
    let extraGenres = []

    btn.addEventListener('click', async(e)=>{
        e.preventDefault();
        const genreList = document.querySelector('.genre-item')
        
        if(!expanded){
            extraGenres = renderGenres(genres.slice(3))
            genreList.insertBefore(extraGenres,btn.parentElement);
            btn.textContent = 'Show Less'
        }
        else{
            extraGenres.remove();
            btn.textContent = 'Show More'
        }

        expanded = !expanded;
    });

    document.querySelectorAll('.genre-item a[data-genre]').forEach(genreLink => {
        genreLink.addEventListener('click', async (e) => {
            e.preventDefault();
            const genreId = e.target.getAttribute('data-genre');
            const genreName = e.target.textContent;
            const games = await getGamesByGenre(genreId);
            loadGamesList(games, genreName);
        });
    });

}

function renderGenres(genres) {
    const fragment = document.createElement('div'); 
    fragment.classList.add("extra-genres"); 

    genres.forEach(genre => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = "#";
        a.textContent = genre.name;
        li.appendChild(a);
        fragment.appendChild(li);

        a.addEventListener("click", async(e)=>{
            e.preventDefault();
            const games = await getGamesByGenre(genre.id);
            loadGamesList(games, genre.name)
        });
    });

    return fragment;
}

export default loadSidebar;