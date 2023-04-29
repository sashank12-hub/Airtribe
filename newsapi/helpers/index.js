const axios =require('axios');

const fetchNews = (category) => {
    const apikey = process.env.APIKEY;
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${apikey}`;
   return axios.get(url);
}

module.exports =fetchNews;
