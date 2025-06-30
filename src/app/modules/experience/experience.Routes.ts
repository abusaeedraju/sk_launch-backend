import { Router } from "express";
import { experienceController } from "./experience.Controller";
import auth from "../../middleware/auth";
import { experienceValidation } from "./experience.Validation";
import validateRequest from "../../middleware/validateRequest";

const route = Router()

route.post('/create', auth(), validateRequest(experienceValidation.createExperienceValidation), experienceController.createExperienceController)

route.delete('/delete/:id', auth(), experienceController.deleteExperienceController)

export const experienceRoutes = route   