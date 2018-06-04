const config = require('../config.js');
const axios = require('axios');
require('dotenv').config();

let getLabels = (imageUrl) => {
  return axios.post(
    'https://vision.googleapis.com/v1/images:annotate',
    {
      requests: [
        {
          image: {
            source: {
              imageUri: imageUrl,
            },
          },
          features: [
            {
              type: 'WEB_DETECTION',
            },
          ],
        },
      ],
    },
    {
      params: {
        key: process.env.CLOUD_VISION_API_KEY,
      },
    },
  );
};

module.exports.getLabels = getLabels;
