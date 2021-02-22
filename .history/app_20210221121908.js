const express = require('express');
const app=express()
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(helmet)

app.use(cors)

app.use(morgan(tiny))


