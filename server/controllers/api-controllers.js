const fs = require('fs');
const path = require('path');
const Data = require('./../db/mongo/mock-data.js');
const User = require('./../db/mongo/user-model.js');
const billy = require('./../db/sql/postgres-billy.js');
const googlePlacesAPIKey = require ('../oauth-config/auth-keys.js');
const googleGeocodingAPI = require ('../oauth-config/auth-keys.js');
const bodyParser = require('body-parser');

const apiController = {};

// Search against mongo DB
apiController.search = (req, res, next) => {
  Data.find({ lat: req.body.latitude, lon: req.body.latitude, date_open: { $gte: new Date(req.body.arrivalDate) }, date_close: { $lte: new Date(req.body.departureDate)} }).toArray((error, result) => {
    if (error) {
      return res.status(5000).send(error);
    }
    // res.status(200).send(result);
    res.locals.result = result;
  })
  next();
}

// Search against Postgres DB and transfer to Mongo DB


apiController.search = (req, res, next) => {
  let location = req.body.location;
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googlePlacesAPIKey.googleMapsAPI.key}`)
  .then(response => response.json())
  .then(json => {
    console.log('geocoding successful.');
    res.locals.lat = json.results[0].geometry.location.lat;
    res.locals.long = json.results[0].geometry.location.lng;
    next()
  });
}

apiController.getNearby = (req, res, next) => {
  let lat = res.locals.lat;
  let long = res.locals.long;
  let id = res.locals.id;
  fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=amusement_park,aquarium,art_gallery,museum&key=${googlePlacesAPIKey.googlePlacesAPI.key}`)
  .then(response => response.json())
  .then(json => {
    console.log('nearby results api call successful.');
    let nearbyResults = [];
    let tempResult = {};

    for (let i = 1; i < json.results.length; i++){
      // Temp object to hold keys of a result.
      tempResult = {
        name: json.results[i].name,
        photoReference: json.results[i].photos ? json.results[i].photos[0].photo_reference : "",
        rating: json.results[i].rating,
        vicinity: json.results[i].vicinity,
        //id: json.results[i].id,
        lat: json.results[i].geometry.location.lat,
        long: json.results[i].geometry.location.lng,
      };
      // Push result to an array.
      nearbyResults.push(tempResult);

      // Init schema model instance and save.
      let result = new Data(tempResult);
      result.save().then(result => result).catch(err => console.log('errrrrr', err));
    }

    // Send array of results back to client.
    res.locals.result = nearbyResults;
    next();
  });
};

// }
  // Places API call ATTEMPT 1

  // fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&key=${googlePlacesAPIKey.googlePlacesAPI.key}`,
  // (res)=>{
  //   res.json()
  // }).then((res) => console.log(res));
//   billy.query(`SELECT * FROM fake_data WHERE ST_DWithin(geom, ST_MakePoint(${req.body.latitude}, ${req.body.longitude})::geography, 5000000) AND date_open <= '${req.body.arrivalDate}' AND date_close >= '${req.body.departureDate}';`, (err, result) => {

  // billy.query(`SELECT * FROM fake_data;`, (err, result) => {
  //   if (err) console.log('we have an errr in search asda', err);
  //   // res.send('suck');

  //   // console.log('result in search controller is:', result);

  //   result.rows.forEach(el => {
  //     // console.log('HOOOYEE', el);
  //     queryArray.push({
  //       id,
  //       address,
  //       zip,
  //       country,
  //       phoneNumber,
  //       lat,
  //       lon,
  //       price,
  //       hashtag,
  //       company,
  //       date_open,
  //       date_close,
  //       image,
  //       website,
  //       rating,
  //       geom,
  //     } = el);
  //   });

    // queryArray.forEach(el => {
    //   new Data(el).save().then(result => result).catch(err => console.log('errrrrr', err));
    // })

  //   console.log('qeuruearray', queryArray);

    // // // res.locals.result = queryArray;
    // return res.send(queryArray);
    // // User.insertMany(JSON.parse(result.rows), (error, documents) => {
    // //   console.log('Data successfully transferred to mongo DB', documents);
    // //   res.locals.mongoDocs = documents;
    // // })

  // })
  // res.locals.result = queryArray;
  // return next();


apiController.addItinerary = (req, res, next) => {
  User.findOneAndUpdate({ username: req.body.username }, { $push: { itinerary: req.body.event } }, { new: true, useFindAndMondify: false }, (error, itinerary) => {
    console.log('new itinerary(added) is:', itinerary);
    if (error) {
      const myError = new Error();
      myError.msg = error;
      return res.status(400).send(myError);
    } else {
      console.log('itinerary successfully updated(item added)!')
      return res.send(itinerary);
    }
  })
  // return next();
}

apiController.removeItinerary = (req, res, next) => {
  User.findOneAndUpdate({ username: req.body.username }, { $pull: { itinerary: req.body.event } }, { new: true }, (error, itinerary) => {
    console.log('new itinerary(removed) is:', itinerary);
    if (error) {
      const myError = new Error();
      myError.msg = error;
      return res.status(400).send(myError);
    } else {
      console.log('itinerary successfully updated(item removed)!')
      res.send(itinerary);
    }
  })
  // return next();
}

module.exports = apiController;