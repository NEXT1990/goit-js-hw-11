import './css/styles.css';

import { Notify } from 'notiflix';
import { PicturesApi } from './js/searching';

const refs = {
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSubmit);

const PictureApi = new PicturesApi();

async function onSubmit(event) {
  event.preventDefault();
  const formElements = event.currentTarget.elements;
  const request = formElements.searchQuery.value;
  PictureApi.query = request.trim();
  console.log(PictureApi.query);
  if (PictureApi.query === '') {
    Notify.warning("Searching can't be empty");
    return;
  }
  PictureApi.resetPage();

  try {
    const { hits, totalHits } = await PictureApi.responseApi();
    render(hits);
  } catch (error) {
    Notify.failure('Something bad');
  }
}

function render(hits) {
  const images = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return ` <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${likes}
          </p>
          <p class="info-item">
            <b>Views</b> ${views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${downloads}
          </p>
          </div>`;
      }
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', images);
}
