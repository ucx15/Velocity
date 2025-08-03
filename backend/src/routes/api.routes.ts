import { Router } from 'express';

import { getAllSongs } from '../controllers/song.controller.js';
import { streamMusic } from '../controllers/stream.controller.js';


const router = Router();


// Songs
router.get('/songs', getAllSongs);

// File Stream
router.get('/stream/:filename', streamMusic);


export default router;
