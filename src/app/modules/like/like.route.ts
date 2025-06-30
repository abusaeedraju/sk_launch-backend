import { Router } from "express";
import { likeController } from "./like.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/:id", auth(), likeController.createLikeController);

export const likeRoutes = router