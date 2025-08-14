import { Router } from 'express';

import { getAllSongs, getSong } from '../controllers/song.controller.js';
import { streamMusic } from '../controllers/stream.controller.js';

const router = Router();


// Songs
router.get('/songs', getAllSongs);
router.get('/song/:id', getSong);

// File Stream
router.get('/stream/:id', streamMusic);


export default router;
