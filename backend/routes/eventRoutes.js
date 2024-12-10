import express from 'express';
import { createEvent } from '../controllers/eventController.js';
import {authenticateJWT} from '../middlewares/roleMiddleware.js';


const router = express.Router();

router.post('/', authenticateJWT, createEvent);

export default router;
