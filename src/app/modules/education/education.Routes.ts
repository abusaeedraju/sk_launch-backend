import { Router } from "express";
import { educationController } from "./education.Controller";
import validateRequest from "../../middleware/validateRequest";
import { educationValidation } from "./education.Validation";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
const route = Router();

route.post(
  "/create",
  auth(Role.USER),
  validateRequest(educationValidation.createEducationValidation),
  educationController.createExperienceController
);

route.delete(
  "/delete/:id",
  auth(Role.USER),
  educationController.deleteExperienceController
);

export const educationRoutes = route;
