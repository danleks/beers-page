const container = document.querySelector('.beers-container');
const pagination = document.querySelector('.pagination');
const paginationItems = document.querySelectorAll('.pagination__item');

const render = (beers) => {
    if (container.children.length > 0) {
        container.innerHTML = '';
    }
    const fragment = document.createDocumentFragment();
    beers.forEach(({ abv, image_url: imageURL, name, tagline, description }) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <span class="card__abv">${ abv }%</span>
            <img class="card__img" src='${imageURL}' alt='${name}'/>
            <h1 class="card__title">${ name }</h1>
            <h2 class="card__subtitle">${ tagline }</h2>
            <p class="card__description">${ description.slice(0, 300) }</p>
        `;
        fragment.appendChild(div);
    })
    container.appendChild(fragment);
}

const handleBeers = async (pageNum = 1) => {
    const BEERS_API = `https://api.punkapi.com/v2/beers?page=${pageNum}&per_page=3`;
    let response = await fetch(BEERS_API);
    let beers = await response.json();
    render(beers);

    return beers;
}

handleBeers();

const handleClick = (e) => {
    if (e.target.tagName !== "LI") return;
    let pageNumber = +e.target.textContent;
    handleBeers(pageNumber);
};

pagination.addEventListener('click', handleClick );