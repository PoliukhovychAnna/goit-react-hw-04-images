import axios from "axios";

const API_KEY = '36097908-8b74f3252a1456be0d804a847';
const baseURL = 'https://pixabay.com/api/';

// axios.defaults.headers.common['x-api-key'] = '36097908-8b74f3252a1456be0d804a847';
// axios.defaults.params = {
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
//   per_page:12,
// };


export const getPictures = async (query, page, signal) => {
  const response = await axios.get(baseURL, {
          signal,
          params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: page,
            per_page: 12,
          },
  });
        return response.data;
      } 



