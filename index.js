const container = document.querySelector('.beers-container');
const pagination = document.querySelector('.pagination');
const paginationItems = document.querySelectorAll('.pagination__item');
const itemsPerPageSelect = document.querySelector('#itemsPerPage-select');
const sortSelect = document.querySelector('#sort-select');

// state vars
let itemsPerPage = 3;


const render = (beers) => {
    if (container.children.length > 0) {
        container.innerHTML = '';
    }
    const fragment = document.createDocumentFragment();
    beers.forEach(({ abv, image_url: imageURL, name, tagline, description, ibu }) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <span class="card__abv">${ abv }%</span>
            <img class="card__img" src='${imageURL}' alt='${name}'/>
            <h1 class="card__title">${ name }</h1>
            <h2 class="card__subtitle">${ tagline }</h2>
            <p class="card__description">${ description.slice(0, 300) }</p>
            <span class="card__ibu">Bitterness: ${ibu}</span>
        `;
        fragment.appendChild(div);
    })
    container.appendChild(fragment);
}

const handleBeers = async (pageNum = 1, showItems = 3, sortByValue = 'abv') => {
    const BEERS_API = `https://api.punkapi.com/v2/beers?page=${pageNum}&per_page=${showItems}`;
    let response = await fetch(BEERS_API);
    let beers = await response.json();
    const beersSorted = beers.sort((a,b) => a[sortByValue] - b[sortByValue]);
    console.log(beers);
    render(beersSorted);

    return beers;
}

const handleItemsPerPage = (e) => {
    if (e) itemsPerPage = +e.target.value;
    handleBeers(undefined, itemsPerPage);
};

const handleSort = (e) => {
    console.log(e.target.value);
    let sortByValue = e.target.value;
    handleBeers(undefined, itemsPerPage, sortByValue)
}

const handlePagination = (e) => {
    if (e.target.tagName !== "LI") return;
    let pageNumber = +e.target.textContent;
    handleBeers(pageNumber, itemsPerPage);
};

handleBeers();
//handleItemsPerPage(undefined, itemsPerPage);

itemsPerPageSelect.addEventListener('change', handleItemsPerPage);
sortSelect.addEventListener('change', handleSort);


pagination.addEventListener('click', handlePagination );