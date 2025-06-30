import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { userServices } from "./user.service";
import sendResponse from "../../middleware/sendResponse";
import { StatusCodes } from "http-status-codes";


const createUserController = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.createUserIntoDB(req.body)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Please check your email for verification", data: result, success: true })
})


const changePasswordController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user
    const body = req.body as any
    const result = await userServices.changePasswordIntoDB(id, body)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "password updated successfully", data: result, success: true })
})

const updateUserController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user
    const body = req?.body as any
    const files = req?.files as any
    console.log(files);

    const logoImage = files?.["logoImage"]?.[0] || null;
    const coverImage = files?.["coverImage"]?.[0] || null;
    const profileImage = files?.["profileImage"]?.[0] || null;
    const videoProfile = files?.["videoProfile"]?.[0] || null;



    const result = await userServices.updateUserIntoDB(id, body, profileImage, logoImage, coverImage, videoProfile)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "User updated successfully", data: result, success: true })
})

const getMyProfileController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user
    const result = await userServices.getMyProfile(id)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "User profile retrieved successfully", data: result, success: true })
})

export const userController = { createUserController, updateUserController, changePasswordController, getMyProfileController }