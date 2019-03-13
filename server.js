const newRelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const proxy = require('http-proxy-middleware');
const port = 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.use(
  '/api/bookingInfo/', proxy({ target: 'http://ec2-54-245-154-37.us-west-2.compute.amazonaws.com', changeOrigin: true})
)

app.use(
  '/api/bookings', proxy({ target: 'http://ec2-54-245-154-37.us-west-2.compute.amazonaws.com', changeOrigin: true})
)


app.use('/api/amenities', proxy({target: 'http://ec2-3-82-148-29.compute-1.amazonaws.com',changeOrigin: true })) 

app.use('/pictures', proxy({target: 'http://ec2-54-219-159-237.us-west-1.compute.amazonaws.com', changeOrigin: true }));

app.use('/api/reviews', proxy({target: 'http://ec2-13-57-34-80.us-west-1.compute.amazonaws.com', changeOrigin: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});





app.listen(port, () => {
  console.log(`I'm serving from http://localhost:${port}`);
});