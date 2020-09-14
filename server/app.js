if (process.env.NODE_ENV === "development"){ 
  require('dotenv').config()
}
const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const router = require("./routes/index.js")
const errorHandler = require("./middlewares/errorHandler")


app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/", router)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})