import { Router } from "express";
import { educationController } from "./education.Controller";
import validateRequest from "../../middleware/validateRequest";
import { educationValidation } from "./education.Validation";
import auth from "../../middleware/auth";
const route = Router();

route.post(
  "/create",
  auth(),
  validateRequest(educationValidation.createEducationValidation),
  educationController.createExperienceController
);

route.delete(
  "/delete/:id",
  auth(),
  educationController.deleteExperienceController
);

export const educationRoutes = route;
