import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
// import { fetchPhoto } from './PixabayApi';
import PixabayApi from './PixabayApi.js';
import LoadMoreBtn from './components/LoadMoreBtn.js';

const form = document.getElementById('search-form');
const galleryPhoto = document.querySelector('.gallery');
const cards = document.querySelector('.cards');

// Створюємо екземпляр класу для роботи з конструктором та методами класу
const cardPixabay = new PixabayApi();

// Створюємо екземпляр класу кнопки для роботи з конструктором та методами класу
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

console.log(cardPixabay);
console.log(loadMoreBtn);

form.addEventListener('submit', onSearchPhoto);
loadMoreBtn.button.addEventListener('click', fetchCards);

function onSearchPhoto(e) {
  e.preventDefault();

  const search = form.elements.searchQuery.value.trim();

  // У цій строці ми зберігаємо те,що нам приходить з інпуту
  // в об'єкт нашого запиту
  cardPixabay.searchQuery = search;
  console.log(search);

  // При сабміті форми скидуємо сторінку на page = 1 та очищуємо вміст сторінки документу
  cardPixabay.resetPage();
  clearMarkup();

  // Після сабміту форми-показуємо кнопку
  loadMoreBtn.show();

  fetchCards()
    .then(totalHits => {
      if (totalHits > 0) {
        console.log(totalHits);
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      }
    })
    .finally(() => form.reset());
}

// При натисканні на кнопку будемо робити новий запит
function fetchCards() {
  loadMoreBtn.disable();

  if (cardPixabay.searchQuery === '') {
    loadMoreBtn.hide();
    return Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
  }
  return cardPixabay
    .getCards()
    .then(data => {
      if (data.hits.length === 0) {
        cards.style.backgroundColor = '#ffffff';
        loadMoreBtn.hide();
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      // if (data.hits.length === data.totalHits) {
      //   loadMoreBtn.hide();
      //   Notiflix.Notify.info(
      //     "We're sorry, but you've reached the end of search results."
      //   );
      //   console.log(data.hits.length);
      // }
      renderMarkupPhoto(data.hits);
      return data.totalHits;
    })
    .catch(onError);
}

function renderMarkupPhoto(resultsSearch) {
  cards.style.backgroundColor = '#efe176';

  const markup = resultsSearch
    .map(
      resultsSearch =>
        `<a href="${resultsSearch.largeImageURL}"><div class="photo-card">
            <img src="${resultsSearch.webformatURL}" alt="${resultsSearch.tags}" loading="lazy" />
            <div class="info">
            <p class="info-item">
            Likes <span class="text">${resultsSearch.likes}</span></p>
            <p class="info-item">
            Views <span class="text">${resultsSearch.views}</span></p>
            <p class="info-item">
            Comments <span class="text">${resultsSearch.comments}</span></p>
            <p class="info-item">
            Downloads <span class="text">${resultsSearch.downloads}</span></p></div></div></a>`
    )
    .join('');
  galleryPhoto.innerHTML = markup;
  loadMoreBtn.enable();
  lightbox.refresh();
}

function onError(error) {
  loadMoreBtn.hide();
  console.error(error);
  // cards.style.backgroundColor = '#ffffff';
}

function clearMarkup() {
  cards.style.backgroundColor = '#ffffff';
  galleryPhoto.innerHTML = '';
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
