const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('VIPER MD — alive');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', name: process.env.APP_NAME || 'VIPER MD' });
});

app.listen(PORT, () => console.log(`web listening on ${PORT}`));
