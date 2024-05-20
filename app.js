const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; //connects to port 3000
const { createElement, seedElements, getId, getElementById, updateElement, subCount } = require('./utils.js'); //imports all the helper functions from utils.js
const cors = require('cors');

app.use(express.static("public"));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); //middleware to use CORS guidelines

const envelopes = [];
seedElements(envelopes, 'envelopes');

app.get("/", (req, res, next) => { // send "hello world" to landing page
  res.send('hello world');
});

app.get('/envelopes', (req, res, next) => { // get elements from "/envelopes"
  res.send(envelopes);
});

app.post("/envelopes", (req, res, next) => { // create new elements at "/envelopes"
  const x = createElement('/envelopes', req.body);
  if (x) {
    envelopes.push(x);
    res.status(201).send(envelopes);
  } else {
    res.status(400).send();
  }
});

app.get("/envelopes/:id", (req, res, next) => { // get envelope based on a specific ID
  const foundID = getElementById(req.params.id, envelopes);
  if (foundID) {
    res.send(foundID);
  } else {
    res.status(404).send();
  }
});

app.put("/envelopes/:id", (req, res, next) => { // update an existing envelope
  const envelopeId = getId(req.params.id, envelopes);
  if (envelopeId !== -1) {
    updateElement(req.params.id, req.body, envelopes);
    res.send(envelopes[envelopeId]);
  } else {
    res.status(404).send();
  }
});

app.delete('/envelopes/:id', (req, res, next) => {        //delete an existing envelope
  const envelopeIndex = getId(req.params.id, envelopes);
  if (envelopeIndex !== -1) {
    envelopes.splice(envelopeIndex, 1);
    subCount();
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.listen(PORT, () => {    //connects code to server
  console.log(`Listening on PORT ${PORT}`);
});
