const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require ('path')

dotenv.config({ path: 'config.env' });
const cors = require('cors')
const ApiError = require('./utils/ApiError');
const globalError = require('./middleware/errorMiddleware');
const dbConnection = require('./config/database');
const mountRoutes = require('./routes');

dbConnection();

// express app
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions))
// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname,'upload')))
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}


mountRoutes(app);
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});