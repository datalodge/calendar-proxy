const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
const proxy = require('http-proxy-middleware');
const port = 3003;

//app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(
  '/api/bookingInfo/', proxy({ target: 'http://localhost:3002', changeOrigin: true})
)

app.use(
  '/api/bookings/', proxy({ target: 'http://localhost:3002', changeOrigin: true})
)

app.use(
  '/api/booking', proxy({target: 'http://localhost:3002', changeOrigin: true})
)



app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`I'm serving from http://localhost:${port}`);
});