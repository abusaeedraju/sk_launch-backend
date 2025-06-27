import { Router } from "express";
import { jobController } from "./job.controller";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";

const route = Router()

route.post("/create",auth(Role.COMPANY), jobController.createJobController)
route.put("/update/:jobId", auth(Role.COMPANY), jobController.editJobController)
route.delete("/delete/:jobId", auth(Role.COMPANY), jobController.deleteJobController)
route.get("/all", jobController.getAllJobController)
route.get("/:jobId", jobController.getSingleJobController)

export const jobRoutes = route


