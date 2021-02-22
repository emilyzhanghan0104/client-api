const express = require('express');
const app=express()
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(helmet())

app.use(cors())

app.use(morgan("tiny"))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/", (req, res) => {
    res.json({message:"hi there!"})
})

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`api is ready on http://localhost:${port}`)
})

