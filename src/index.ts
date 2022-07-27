import bodyParser from 'body-parser';
import express from 'express';
const app = express();
var xhub = require('express-x-hub');
require('dotenv').config();

const port = process.env.PORT || 5500
app.set('port', port);
app.listen(app.get('port'));

app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }));
app.use(bodyParser.json());

var token = process.env.TOKEN || 'token';
const received_updates: any[] = [];

app.get('/', (req, res) => {
  res.send('<pre>' + JSON.stringify(received_updates, null, 2) + '</pre>');
});

app.get('/facebook', (req, res) => {
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == token
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

app.post('/facebook', (req: any, res) => {
  console.log('Facebook request body:', req.body);

  if (!req.isXHubValid()) {
    console.log(
      'Warning - request header X-Hub-Signature not present or invalid'
    );
    res.sendStatus(401);
    return;
  }

  console.log('request header X-Hub-Signature validated');
  // Process the Facebook updates here
  received_updates.unshift(req.body);
  res.sendStatus(200);
});

app.listen(()=>{
  console.log(`Servidor iniciado en http://localhost:${port}`)
});
