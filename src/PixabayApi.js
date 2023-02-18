const searchParams = new URLSearchParams({
  key: '33748627-7891d096c823642155aa62d5d',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

function fetchPhoto(name) {
  const URL = `https://pixabay.com/api/?q=${name}&${searchParams}`;

  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchPhoto };
