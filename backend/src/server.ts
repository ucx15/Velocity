import express from 'express';
import cors from 'cors';

import env from './utils/env.js';
import connectToDB from './db/db.js';

import apiRoutes from './routes/api.routes.js';

import loadInitialData from './controllers/loader.controller.js';

// Constants
const PORT = env.PORT;


// App Setup
const app = express();

// Middlewares
app.use(cors({origin: '*', credentials: true}));
app.use(express.json({limit : '100mb'}));


// Routes
app.use('/api', apiRoutes);


// Start the server
if ( await connectToDB() ) {

  if (env.LOAD_DATA) {
    loadInitialData();
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
