const request = require('request');
require('dotenv').config();

let getRestaurantRecommendations = (location, callback) => {
  const options = {
    method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    qs: {
      location,
      categories: 'restaurants',
      // attributes: 'hot_and_new',
      sort_by: 'rating',
      limit: 10,
    },
    headers:
      {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    callback(body);
  });
};

module.exports.getRestaurantRecommendations = getRestaurantRecommendations;

