import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params:{
    api_key:"cde42209453daf95e4ca211d8b327f76",
    language : "ko-KR"
  },
})

export default instance;