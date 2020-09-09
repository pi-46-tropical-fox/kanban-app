require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes');
const cors = require('cors')
//require errHandler

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

app.use(router)

//errHandler

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})