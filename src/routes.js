const express = require('express');
const getContent = require('./getContent');

const routes = express.Router();

routes.post('/url', (req, res) => {
  const {url} = req.body;
  getContent(url).then(content => res.send(content))
})

module.exports = routes