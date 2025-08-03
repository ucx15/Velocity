import { Router } from 'express';
import { streamMusic } from '../controllers/stream.controller.js';


const router = Router();


// File Stream
router.get('/api/stream/:filename', streamMusic);


export default router;
