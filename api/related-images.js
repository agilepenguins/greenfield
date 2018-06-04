const config = require('../config.js');
const axios = require('axios');
require('dotenv').config();

let getRelated = (query) => {
  return axios.get(
    'https://www.googleapis.com/customsearch/v1',
    {
      params: {
        q: query,
        num: '5',
        imgSize: 'huge',
        searchType: 'image',
        key: process.env.CUSTOM_SEARCH_API_KEY,
        cx: '007252562560416389486:mtzxxzauohg',
      },
    },
  );
};

module.exports.getRelated = getRelated;
