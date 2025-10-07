import { contactUS } from "../controllers/contactUs.js";
import express from 'express';

const contactRouter = express.Router();

contactRouter.post('/contact-us', contactUS);

export default contactRouter;