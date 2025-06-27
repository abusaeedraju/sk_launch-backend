import { Router } from "express";
import { favoriteController } from "./favorite.controller";
import auth from "../../middleware/auth";

const router = Router()

router.post('/add/:jobId',auth(), favoriteController.addFavoriteController)
router.delete('/delete/:id',auth(), favoriteController.deleteFavoriteController)
router.get('/get',auth(), favoriteController.getFavoriteController)

export const favoriteRoutes = router