import axios from 'axios';

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "4fa1ec171e6b1a910634e004d81e42a0",
    language: "ko-KR"
  }
})

// default로 export 했으므로 import 시 이름 바꿔서도 가능.
export default instance;
