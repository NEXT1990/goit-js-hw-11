import './css/styles.css';

import { Notify } from 'notiflix';
import { PicturesApi } from './js/searching';
import { LoadMoreBtn } from './js/loadMoreBtn';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let totalLoadHits = 40;
const gallery = document.createElement('div');
gallery.classList.add('gallery');

const refs = {
  input: document.querySelector('input[name="searchQuery"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
};
console.log(refs.input);
refs.form.addEventListener('submit', onSubmit);

const pictureApi = new PicturesApi();
const loadMoreBtn = new LoadMoreBtn('load-more', onLoadMoreBtn);
const simpleLightBox = new SimpleLightbox('.full-image', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(document.querySelector('full-image'));

async function onSubmit(event) {
  event.preventDefault();

  const formElements = event.currentTarget.elements;
  const request = formElements.searchQuery.value;
  pictureApi.query = request.trim();
  console.log(pictureApi.query);
  if (pictureApi.query === '') {
    gallery.innerHTML = '';
    gallery.remove();
    loadMoreBtn.hide();

    Notify.warning("Searching can't be empty");
    return;
  }

  pictureApi.resetPage();

  try {
    refs.form.after(gallery);
    const { hits, totalHits } = await pictureApi.responseApi();

    if (hits.length === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      gallery.innerHTML = '';
      loadMoreBtn.hide();
      return;
    } else if (totalHits < 40) {
      Notify.info(`Hooray! We found ${totalHits} images.`);
      render(hits);
      simpleLightBox.refresh();
      loadMoreBtn.hide();
      return;
    }
    Notify.info(`Hooray! We found ${totalHits} images.`);
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
      <a class="full-image" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" width=600 height=350 /></a>
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
  gallery.insertAdjacentHTML('beforeend', images);
}

async function onLoadMoreBtn() {
  loadMoreBtn.loading();
  try {
    const { hits, totalHits } = await pictureApi.responseApi();
    let total = (totalLoadHits += hits.length);
    console.log(total);
    render(hits);
    simpleLightBox.refresh();
    loadMoreBtn.endLoading();
    console.log(hits);
    console.log(totalHits);
    if (totalHits === total) {
      loadMoreBtn.hide();
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    Notify.failure('Something bad');
  }
}
