const API_KEY = 'b6526c02de6d464abdae2590e7f954d1';
const BASE_URL = 'https://api.rawg.io/api';

async function fetchData(endpoint, params = '', expectedList = true){
    try{
        const url = `${BASE_URL}/${endpoint}?key=${API_KEY}&${params}`
        const response = await fetch(url);

        if(!response.ok){
            throw new error(response.status)
        }

        const data = await response.json();
        console.log('esto es api',url);

        return expectedList ? data.results : data;

    } catch(error){
        console.error("Error fetching game:", error);
        return null;
    }
}

export async function searchGames(query){
    return fetchData('games', `&search=${query}`);
}

export async function getPlatforms(){
    return fetchData('platforms');
}

export async function getPopularGames(){
    return fetchData('games','&ordering-added&page_size=20');
}

export async function getGames(){
    return fetchData('games','&page_size=40');
}

export async function getGenres(){
    return fetchData('genres');
}

export async function getGamesByGenre (id) {
    return fetchData ('games', `genres=${id}`)
}

export async function getNewGames(){
    const actualDate = new Date();
    const threeMonthAgo = new Date();
    threeMonthAgo.setMonth(actualDate.getMonth() - 3)

    const startDate = `${threeMonthAgo.getFullYear()}-${String(threeMonthAgo.getMonth() + 1).padStart(2, '0')}-01`;
    const endDate = `${actualDate.getFullYear()}-${String(actualDate.getMonth() + 1).padStart(2, '0')}-${String(actualDate.getDate()).padStart(2, '0')}`;

    return fetchData('games', `&page_size=20&dates=${startDate},${endDate}&ordering=-released&ordering=-rating`);                           
}

export async function getRandomTopGame() {
    const games = await getGames();

    if (!games || games.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * games.length);
    return games[randomIndex];
}

export async function getGameById(id) {
    console.log(`games/${id}`,false);

    return fetchData(`games/${id}`,'',false);
}

export async function getAllGames(id) {
    const games = await fetchData('games', `&page_size=40&platforms=${id}`);
    return games;
}

export async function getGameScreenshots(id) {
    return fetchData(`games/${id}/screenshots`, '', true);
}