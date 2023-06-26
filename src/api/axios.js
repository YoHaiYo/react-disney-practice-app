import axios from 'axios';

const instance = axios.create({
  baseURL: "https://api.themoviedb.org.w3",
  params: {
    api_key: "4fa1ec171e6b1a910634e004d81e42a0",
    language: "ko-KR"
  }
})

export default instance;