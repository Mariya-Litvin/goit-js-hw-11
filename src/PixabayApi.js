const searchParams = new URLSearchParams({
  key: '33748627-7891d096c823642155aa62d5d',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  // per_page: 40,
});

// function fetchPhoto(name) {
//   const URL = `https://pixabay.com/api/?q=${name}&${searchParams}`;

//   return fetch(URL).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// export { fetchPhoto };

export default class PixabayApi {
  constructor() {
    this.per_page = 40;
    this.page = 1;
    this.searchQuery = '';
  }

  getCards() {
    const URL = `https://pixabay.com/api/?q=${this.searchQuery}&${searchParams}&page=${this.page}&per_page=${this.per_page}`;

    return fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(({ hits }) => {
        // Переключаємо на наступну сторінку при кожному новому запиті
        this.nextPage();
        return hits;
      });
    // .then(totalHits => {
    //   console.log(totalHits);
    // });
  }

  // Будемо за допомогою цього методу звертатися
  // до поточної сторінки і робити +1 (переключатися на наступну сторінку)
  nextPage() {
    this.per_page += 40;
    this.page += 1;
  }

  // Метод для присвоєння сторінці значення 1 при новому запиті
  resetPage() {
    this.page = 1;
  }
}
