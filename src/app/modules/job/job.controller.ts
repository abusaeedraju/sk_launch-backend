import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { jobServices } from "./job.service";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../middleware/sendResponse";

const createJobController = catchAsync(async (req: Request, res: Response) => { 
    const payload = req.body as any
    const {id: companyId} = req.user
    const result = await jobServices.createJob(payload, companyId)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Job created successfully", data: result, success: true })
})

const editJobController = catchAsync(async (req: Request, res: Response) => {
    const {jobId} = req.params
    const payload = req.body as any
    const result = await jobServices.editJob( jobId,payload)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Job updated successfully", data: result, success: true })
})

const deleteJobController = catchAsync(async (req: Request, res: Response) => {
    const {jobId} = req.params
    const result = await jobServices.deleteJob(jobId as any)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Job deleted successfully", data: result, success: true })
})

const getAllJobController = catchAsync(async (req: Request, res: Response) => {
    const result = await jobServices.getAllJob()
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Job fetched successfully", data: result, success: true })
})

const getSingleJobController = catchAsync(async (req: Request, res: Response) => {
    const {jobId} = req.params
    const result = await jobServices.getSingleJob(jobId as any)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Job fetched successfully", data: result, success: true })
})

export const jobController = { createJobController, editJobController, deleteJobController, getAllJobController, getSingleJobController }