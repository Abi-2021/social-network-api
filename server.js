const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const users = require('./routes/users');
const thoughts = require('./routes/thoughts');

// load dotenv config
dotenv.config({ path: './config/config.env' });

// connect database
connectDB();
const app = express();

// hook all middleware
app.use(express.json());
if (process.env.ENVIRONMENT === 'development') {
    app.use(morgan('dev'));
}

// mount routers
app.use('/api/v1/users', users);
app.use('/api/v1/thoughts', thoughts);

app.use(errorHandler);

const PORT = process.env.PORT || 5501;
app.listen(PORT, () =>
    console.log(
        `Server running in ${process.env.ENVIRONMENT} mode on port ${PORT}`
    )
);
