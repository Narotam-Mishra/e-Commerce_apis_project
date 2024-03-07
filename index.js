
const express = require('express');
require('dotenv').config();
require('express-async-errors');
const server = express();

// rest of used packages

// morgan middlware for logging
const morgan = require('morgan');

// database connection
const connectDB = require('./db/DBConnection');

// routers
const authRoute = require('./routes/authRoutes');

// middleaware setup ans error handling

// middleware imports
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

server.use(morgan('tiny'));

// middleware setup to access JSON data
server.use(express.json())

server.get('/', (req,res) => {
    res.send('welcome to e-commerce service...')
});

server.use('/api/v1/auth', authRoute);

server.use(notFoundMiddleware);
server.use(errorHandlerMiddleware);

const portNo = process.env.PORT || 7474;
const mongo_URI = process.env.mongoURL;

const startServer = async () => {
    try {
        await connectDB(mongo_URI)
        .then(() => console.log('DB Connected'))
        server.listen(portNo, () => {
            console.log(`Server is listening on port ${portNo}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();