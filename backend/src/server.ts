import express from 'express';
import cors from 'cors';

import env from './utils/env.js';
import connectToDB from './db.js';

import apiRoutes from './routes/api.routes.js';


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

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}