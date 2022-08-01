import bodyParser from 'body-parser';
import express from 'express';
require('dotenv').config();
import { PORT, VERIFICATION_TOKEN } from './config/config';
import facebookService from './services/facebook.service';
const xhub = require('express-x-hub');

const app = express();

app.set('port', PORT);
app.listen(app.get('port'));

app.use(bodyParser.json());
// app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }));

const received_updates: any[] = [];
let current_entry: any;

app.get('/', (req, res) => {
  res.json(received_updates);
});
app.get('/entry', (req, res) => {
  res.json(current_entry);
});

// @INFO: Rutas para integración con Facebook
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

// @INFO: Rutas para integración con Facebook
app.post('/facebook', async (req: any, res) => {
  // if (req.isXHubValid && !req.isXHubValid()) {
  //   console.log(
  //     'Warning - request header X-Hub-Signature not present or invalid'
  //   );
  //   res.sendStatus(401);
  //   return;
  // }

  const { entry } = req.body;

  if (entry?.length > 0) {
    current_entry = entry;
    const leads = await facebookService.getLeadsByEntry(entry);
    console.log('leads', leads);
    received_updates.unshift(...leads);
  }

  // Process the Facebook updates here
  res.sendStatus(200);
});

app.listen(() => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
