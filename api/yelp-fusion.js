const request = require('request');
const config = require('../config.js');
const yelp = require('yelp-fusion');

let getRestaurantRecommendations = (location, callback) => {

  const options = {
    method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    qs: { 
      location,
      sort_by: 'distance',
      limit: 5 
    },
    headers:
      {
        Authorization: `Bearer ${process.env.API_key}`
      },
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    callback(body);
  });
};

module.exports.getRestaurantRecommendations = getRestaurantRecommendations;

/*
  const apiKey = process.env.API_key;
  const searchRequest = {
    location: 'location'
  };
  const client = yelp.client(apiKey);

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
  }).catch(e => {
    console.log(e);
  });
*/
