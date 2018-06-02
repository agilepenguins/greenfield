const request = require('request');
const config = require('../config.js');
// const cloud = require('path to cloud api');

let getLabels = (image_url, callback) => {
    
    // {
    //     "requests":[
    //       {
    //         "image":{
    //           "source":{
    //             "imageUri":
    //               image_url
    //           }
    //         },
    //         "features":[
    //           {
    //             "type":"LABEL_DETECTION",
    //             "maxResults":1
    //           }
    //         ]
    //       }
    //     ]
    //   }

//   let options = {
//     url: image_url,
//     headers: {
//         'User-Agent': 'request',
//         'Authorization': `token ${config.TOKEN}`
//     }
//   }
// request.get(options, (error, response) => {
// if (error) {
//     console.log(error);
// } else {
//     let parsedResponse = JSON.parse(response.body);

//     console.log(parsedResponse);
//     callback(parsedResponse, image_url);
//     }
// });
}

module.exports.getLabels = getLabels;