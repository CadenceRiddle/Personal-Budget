const express = require('express');
const app = express();
const PORT = process.env.PORT|| 3000;
const { createElement } = require('./utils.js');
const cors = require('cors')

app.use(express.static("public"));
app.use(express.json());
app.use(cors()); // Middleware to parse JSON bodies

const envelopes = [];


app.get("/", (req, res, next)=>{
  res.send('hello world');
})

app.get('/envelopes', (req, res, next)=>{
  res.send(envelopes);
})

app.post("/envelopes", (req, res, next) => {
  const x = createElement('envelopes', req.query);
  if(x){
    envelopes.push(x);
    res.status(201).send(envelopes);
  }
  else{
    res.status(400).send();
  };
});

app.listen(PORT, ()=>{
  console.log(`Listening on PORT ${PORT}`);
})