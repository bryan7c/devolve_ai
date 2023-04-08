const mongoose = require('mongoose');
const uri = process.env.MONGO_CONNECTION_URL;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(client => {
	console.log('Connected to Database');
})
.catch(error => console.error(error));;

module.exports = mongoose;
