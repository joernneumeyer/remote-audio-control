import * as express from 'express';
import * as path    from 'path';
import * as loudness from 'loudness';
import bodyParser from 'body-parser';
// @ts-ignore
import * as nodeKeySender from 'node-key-sender';

const app = express.default();

const endpoint = {
  host: '0.0.0.0',
  port: 8081,
}

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.put('/volume', async (req  , res) => {
  console.log('volume request body', req.body);
  const volume = parseInt(req.body.volume);
  if (isNaN(volume)) {
    res.status(400).end();
    return;
  }
  await loudness.setVolume(volume);
  console.log('updated volume to level', volume);
  res.status(200).end('ok');
});

app.get('/volume', async (_req, res) => {
  const volume = await loudness.getVolume();
  res.json(volume).end();
});

app.put('/toggle-play', (_req, res) => {
  nodeKeySender.sendKey('space');
  console.log('pressed space');
  res.end();
});

app.listen(endpoint.port, endpoint.host, () => {
  console.log(`server is running on ${endpoint.host}:${endpoint.port}`);
});
