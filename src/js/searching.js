import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
export class PicturesApi {
  constructor() {
    this.key = '32251243-fbd11de6fcf1160e262026676';
    this.query = '';
    this.page = 1;
    this.perPage = 40;
  }

  async responseApi() {
    const options = new URLSearchParams({
      key: this.key,
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: this.perPage,
    });
    const { data } = await axios(`?${options}`);
    this.page += 1;
    return data;
  }

  /**
   * @param {string} request
   */
  set setQuery(request) {
    this.query = request;
  }

  get getQuery() {
    return this.query;
  }

  resetPage() {
    this.page = 1;
  }
}
