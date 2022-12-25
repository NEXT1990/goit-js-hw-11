import './css/styles.css';

import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchPhotos from './js/searching';
const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const formElements = event.currentTarget.elements;
  const request = formElements.searchQuery.value;
  fetchPhotos(request);
}
