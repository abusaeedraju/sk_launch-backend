import { Router } from "express";
import { jobController } from "./job.controller";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";

const route = Router()

route.post("/create",auth(Role.COMPANY), jobController.createJobController)
route.put("/update/:jobId", auth(Role.COMPANY), jobController.editJobController)
route.delete("/delete/:jobId", auth(Role.COMPANY), jobController.deleteJobController)
route.get("/all",auth(), jobController.fetchJobsHandler)
route.get("/:jobId", auth(), jobController.getSingleJobController)

export const jobRoutes = route


