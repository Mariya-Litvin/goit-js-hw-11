import Notiflix from 'notiflix';
import { fetchPhoto } from './PixabayApi';
// import debounce from 'lodash.debounce';

const form = document.getElementById('search-form');
const galleryPhoto = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
// const DEBOUNCE_DELAY = 300;

form.addEventListener('submit', onSearchPhoto);

function onSearchPhoto(e) {
  e.preventDefault();

  const search = form.elements.searchQuery.value.trim();
  console.log(search);
  // clearMarkup();
  if (search != '') {
    fetchPhoto(search)
      .then(({ hits }) => {
        return renderMarkupPhoto(hits);
      })
      .catch(onError);
  }
}

function renderMarkupPhoto(resultsSearch) {
  const markup = resultsSearch
    .map(
      resultsSearch =>
        `<div class="photo-card">
            <img src="${resultsSearch.webformatURL}" alt="${resultsSearch.tags}" loading="lazy" />
            <div class="info">
            <p class="info-item">
            <b>Likes ${resultsSearch.likes}</b></p>
            <p class="info-item">
            <b>Views ${resultsSearch.views}</b></p>
            <p class="info-item">
            <b>Comments ${resultsSearch.comments}</b></p>
            <p class="info-item">
            <b>Downloads ${resultsSearch.downloads}</b></p></div></div>`
    )
    .join('');
  galleryPhoto.innerHTML = markup;
}
