//index.js
const express = require('express')
const cors = require('cors')
const entitiesRouter = require("./routers/entitiesRouter"); 
const categoriesRouter = require("./routers/categoriesRouter"); 
const languageRouter = require("./routers/languageRouter"); 
const bodyParser = require("body-parser");
const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.use('/entities', entitiesRouter);
app.use('/categories', categoriesRouter);
app.use('/language', languageRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});