//index.js
const express = require('express')
const cors = require('cors')
const entitiesRouter = require("./routers/entitiesRouter"); 
const bodyParser = require("body-parser");
const app = express();
app.use(cors())

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/entities', entitiesRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});