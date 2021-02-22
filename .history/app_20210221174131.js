require('dotenv').config()
const express = require('express');
const app=express()
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

//api security
app.use(helmet())

//handle cors error
app.use(cors())

//MongoDB connection setup
const mongoose=require('mongoose')

await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex:true
})

// Logger
app.use(morgan("tiny"))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const userRouter = require('./src/routers/user.router');
const ticketRouter = require('./src/routers/ticket.router');

app.use("/v1/user", userRouter)
app.use("/v1/ticket", ticketRouter)

const  handleError= require('./src/utils/errorHandler');

app.use((req, res, next) => {
    const error = new Error("Resource not found")
    error.status = 404
    next(error)
  
})

app.use((error, req, res, next) => {
    handleError(error, res)
  
})

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`api is ready on http://localhost:${port}`)
})

