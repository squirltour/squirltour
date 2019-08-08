const router = require('express').Router();
const apiController = require('../controllers/api-controllers');

router.post('/search', apiController.search, apiController.getNearby, (req, res) => {
  console.log('sending result on res.locals.');
  res.status(200).send(res.locals.result);
});

router.put('/itinerary/add', apiController.addItinerary, (req, res) => {
  res.status(200).send(res.locals.itineraryAdd);
});

router.put('/itinerary/remove', apiController.removeItinerary, (req, res) => {
  res.status(200).send(res.locals.itineraryRemove);
});

module.exports = router;