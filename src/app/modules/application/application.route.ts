import { Router } from "express";
import { applicationController } from "./application.controller";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";

const router = Router()

router.post('/create/:jobId',auth(Role.USER), applicationController.createApplicationController)
router.get('/getByUserId',auth(Role.USER), applicationController.getApplicationByUserIdController)
router.get('/applicantProfileView/:applicationId',auth(Role.COMPANY), applicationController.applicantProfileViewController)
router.put('/shortlistApplication/:applicationId',auth(Role.COMPANY), applicationController.shortlistApplicationController)
router.put('/interviewApplication/:applicationId',auth(Role.COMPANY), applicationController.interviewApplicationController)
router.get('/getProfileViewedJob',auth(Role.USER), applicationController.getProfileViewedJobController)
router.get('/getShortlistedJob',auth(Role.USER), applicationController.getShortlistedJobController)
router.get('/getInterviewJob',auth(Role.USER), applicationController.getInterviewJobController)

export const applicationRoutes = router     