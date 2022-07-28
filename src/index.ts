import bodyParser from 'body-parser';
import express from 'express';
require('dotenv').config();
import { PORT, VERIFICATION_TOKEN } from './config/config';
import facebookService from './services/facebook.service';
import { Entry } from './types/webhook.types';
const app = express();
var xhub = require('express-x-hub');

app.set('port', PORT);
app.listen(app.get('port'));

app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }));
app.use(bodyParser.json());

const received_updates: any[] = [];

app.get('/', (req, res) => {
  res.send('<pre>' + JSON.stringify(received_updates, null, 2) + '</pre>');
});

app.get('/facebook', (req, res) => {
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == VERIFICATION_TOKEN
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

app.post('/facebook', async (req: any, res) => {
  if (!req.isXHubValid()) {
    console.log(
      'Warning - request header X-Hub-Signature not present or invalid'
    );
    res.sendStatus(401);
    return;
  }

  const { entry } = req.body;

  if (entry) {
    const leads = await facebookService.getLeadsByEntry(entry);
    console.log('leads', leads)
    received_updates.unshift(...leads);
  }

  // Process the Facebook updates here
  res.sendStatus(200);
});

app.listen(() => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
