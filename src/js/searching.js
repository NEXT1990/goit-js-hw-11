import axios from 'axios';

const API_KEY = `32251243-fbd11de6fcf1160e262026676`;
function serchPhoto(event) {
  const urlApi = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(urlApi).then(res => {
    if (res.status !== 200) {
      console.log('Все что угодно, но не 200!');
    }
    return res.json();
  });
}
