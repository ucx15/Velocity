import { Router } from 'express';
import { streamMusic } from '../controllers/stream.controller.js';


const router = Router();


router.get('/api/stream/:filename', streamMusic);


export default router;
