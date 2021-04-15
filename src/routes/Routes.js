import express from 'express';

const router = express.Router();

import userRoutes from './UserRoutes';
import adRoutes from './AdRoutes';
import * as RootController from '../controllers/RootController';

//Root Routes
router.get("/ping", (req, res) => {
    res.json({ pong: true });
});
router.get("/states",RootController.getStates);
router.get("/categories", RootController.getCagegories);

//Custom routes
router.use("/user",userRoutes);
router.use("/ad",adRoutes);

export default router;