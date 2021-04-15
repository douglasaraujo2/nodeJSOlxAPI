import express from 'express';
import * as AuthMiddleware from '../middlewares/Auth';

const router = express.Router();

import * as AdsController from '../controllers/AdsController'

router.post("/add", AuthMiddleware.auth, AdsController.addAction);
router.get("/list", AdsController.getList);
router.get("/item", AdsController.getItem);
router.post("/:id", AuthMiddleware.auth, AdsController.editAction);

export default router;