import './css/styles.css';

import { Notify } from 'notiflix';
import { PicturesApi } from './js/searching';
import { LoadMoreBtn } from './js/loadMoreBtn';

const refs = {
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSubmit);

const pictureApi = new PicturesApi();
const loadMoreBtn = new LoadMoreBtn('load-more', onLoadMoreBtn);

async function onSubmit(event) {
  event.preventDefault();
  const formElements = event.currentTarget.elements;
  const request = formElements.searchQuery.value;
  pictureApi.query = request.trim();
  console.log(pictureApi.query);
  if (pictureApi.query === '') {
    Notify.warning("Searching can't be empty");
    return;
  }
  pictureApi.resetPage();

  try {
    const { hits, totalHits } = await pictureApi.responseApi();
    if (hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.gallery.innerHTML = '';
    }
    render(hits);
    loadMoreBtn.show();
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
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width=600 height=350 />
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
          </div>
          </div>`;
      }
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', images);
}

async function onLoadMoreBtn() {
  loadMoreBtn.loading();
  try {
    const { hits, totalHits } = await pictureApi.responseApi();
    render(hits);
    loadMoreBtn.endLoading();
  } catch (error) {
    Notify.failure('Something bad');
  }
}
