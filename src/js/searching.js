import axios from 'axios';

export default class Searching {
  constructor() {
    url =
      'https://pixabay.com/api/?image_type=photo&orientation=horizontal&safesearch=true';
    q = '';
    key = '32251243-fbd11de6fcf1160e262026676';
    page = 1;
    perPage = 40;
    lengthArrayPhotos;
  }

  newPage() {
    this.page = 1;
  }

  addPages() {
    this.page += 1;
  }

  set setNewRequest(request) {
    this.q = request;
  }
  get getCurrentRequest() {
    return this.q;
  }

  onFetch() {
    const url = `${this.url}&key=${this.key}&q=${this.q}&page=${this.page}&perPage=${this.perPage}`;
    const resolve = axios.get(url);
    this.lengthArrayPhotos = resolve.data.hits.length;
    return resolve;
  }
}
