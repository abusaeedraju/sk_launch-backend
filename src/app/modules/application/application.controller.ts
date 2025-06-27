import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../middleware/sendResponse";
import { applicationServices } from "./applicatoin.service";

const createApplicationController = catchAsync(async (req: Request, res: Response) => {
    const { jobId } = req.params
    const { id: userId } = req.user
    const result = await applicationServices.createApplication(userId, jobId)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Application successfully", data: result, success: true })
})  

const getApplicationByUserIdController = catchAsync(async (req: Request, res: Response) => {
    const { id: userId } = req.user
    const result = await applicationServices.getAppliedJob(userId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Application fetched successfully", data: result, success: true })
})

const applicantProfileViewController = catchAsync(async (req: Request, res: Response) => {
    const { applicationId } = req.params
    const result = await applicationServices.applicantProfileView(applicationId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Application fetched successfully", data: result, success: true })
})

const getProfileViewedJobController = catchAsync(async (req: Request, res: Response) => {
    const { id: userId } = req.user
    const result = await applicationServices.getProfileViewedJob(userId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Application fetched successfully", data: result, success: true })
})

const shortlistApplicationController = catchAsync(async (req: Request, res: Response) => {
    const { applicationId } = req.params
    const result = await applicationServices.shortlistApplication(applicationId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Application fetched successfully", data: result, success: true })
})

const getShortlistedJobController = catchAsync(async (req: Request, res: Response) => {
    const { id: userId } = req.user
    const result = await applicationServices.getShortlistedJob(userId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Application fetched successfully", data: result, success: true })
})
const interviewApplicationController = catchAsync(async (req: Request, res: Response) => {
    const { applicationId } = req.params
    const result = await applicationServices.interviewApplication(applicationId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Application fetched successfully", data: result, success: true })
})

const getInterviewJobController = catchAsync(async (req: Request, res: Response) => {
    const { id: userId } = req.user
    const result = await applicationServices.getInterviewJob(userId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Application fetched successfully", data: result, success: true })
})

export const applicationController = {
    createApplicationController,
    getApplicationByUserIdController,
    getProfileViewedJobController,
    getShortlistedJobController,
    getInterviewJobController,
    applicantProfileViewController,
    shortlistApplicationController,
    interviewApplicationController
}
