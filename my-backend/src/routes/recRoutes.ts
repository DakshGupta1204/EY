import { Router } from "express";
import { recommendUser } from "../controllers/recControllers";

const router = Router();
router.use('/recommend', recommendUser);

export default router;