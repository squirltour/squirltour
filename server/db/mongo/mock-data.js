const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://squirtletouruser:squirtlesquirtle@cluster0-yvngd.mongodb.net/test?retryWrites=true&w=majority',
  //'mongodb+srv://bleep241:g@teofMongodb65@dumblecluster-l56v3.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true }, () => {
    console.log('you are connect to dumboclsut');
  }
);

const dataSchema = mongoose.Schema({
  id: Number,
  vicinity: String,
  zip: String,
  country: String,
  phonenumber: String,
  lat: String,
  lon: String,
  price: String,
  hashtag: String,
  company: String,
  date_open: Date,
  date_close: Date,
  image: String,
  website: String,
  rating: Number,
  geom: String,
});

const Data = mongoose.model('dummy', dataSchema);




module.exports = Data;
