import { Router } from "express";
import { experienceController } from "./experience.Controller";
import auth from "../../middleware/auth";
import { experienceValidation } from "./experience.Validation";
import validateRequest from "../../middleware/validateRequest";
import { Role } from "@prisma/client";

const route = Router();

route.post(
  "/create",
  auth(Role.USER),
  validateRequest(experienceValidation.createExperienceValidation),
  experienceController.createExperienceController
);

route.delete(
  "/delete/:id",
  auth(Role.USER),
  experienceController.deleteExperienceController
);

export const experienceRoutes = route;
