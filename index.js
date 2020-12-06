const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
var request = require("request");

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.post('/preview', (req, res) => {
  console.log(req.body);
  const websiteUrl = req.body.websiteUrl;

  request(websiteUrl, function (error, response, body) {
      if (!error) {
          res.send(body);
      } else {
          res.status(404).send(error);
      }
  });
});

app.listen(process.env.PORT || 8080);
