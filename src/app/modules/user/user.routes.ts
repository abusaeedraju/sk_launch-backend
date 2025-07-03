import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { userController } from "./user.controller";
import { UserValidation } from "./user.validation";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { fileUploader } from "../../helper/uploadFile";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";

const route = Router()

route.post('/create', validateRequest(UserValidation.createValidation), userController.createUserController)

route.put('/change-password', auth(), validateRequest(UserValidation.changePasswordValidation), userController.changePasswordController)

route.put("/update", auth(),fileUploader.uploadProfileUpdate, parseBodyMiddleware, userController.updateUserController)
route.get("/profile", auth(), userController.getMyProfileController)
route.get("/get/:userId", auth(), userController.getSingleProfileController)

export const userRoutes = route