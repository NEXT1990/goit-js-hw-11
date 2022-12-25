import axios from 'axios';

const API_KEY = '32251243-fbd11de6fcf1160e262026676';
let q = '';
let page = 1;
const perPage = 40;

export default async function fetchPhotos(request) {
  const urlApi = `https://pixabay.com/api/?key=${API_KEY}&q=${request}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
  await axios(urlApi).then(res => {
    if (res.status !== 200) {
      console.log('Все что угодно, но не 200!');
    }
    return res;
  });
}
