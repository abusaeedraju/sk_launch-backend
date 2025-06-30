import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../middleware/sendResponse";
import { StatusCodes } from "http-status-codes";
import  {LikeService}  from "./like.service";
const createLikeController = catchAsync(async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { id } = req.params
    const communityData = await LikeService.createLike(userId, id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Like/Dislike created successfully",
        data: communityData,
        success: true,
    });
})


export const likeController = {
    createLikeController
}