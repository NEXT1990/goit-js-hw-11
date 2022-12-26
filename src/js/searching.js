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

// export default async function fetchPhotos(request) {
//   const urlApi = `https://pixabay.com/api/?key=${API_KEY}&q=${request}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
//   await axios(urlApi).then(res => {
//     if (res.status !== 200) {
//       console.log('Все что угодно, но не 200!');
//     }
//     console.log(res.data);
//     return res;
//   });
// }
