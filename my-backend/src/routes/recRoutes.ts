import { Router } from "express";
import { quizUser, recommendMoreUser, recommendUser } from "../controllers/recControllers";

const router = Router();
router.use('/recommend', recommendUser);
router.post('/recommendSim', recommendMoreUser);
router.post('/quiz', quizUser);
export default router;