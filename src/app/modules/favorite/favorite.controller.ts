import { favoriteServices } from "./favorite.service";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../middleware/sendResponse";

const addFavoriteController = catchAsync(async (req: Request, res: Response) => {
    const jobId = req.params.jobId
    const userId = req.user.id  
    const result = await favoriteServices.addFavorite(userId, jobId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Favorite added successfully", data: result, success: true })      
})  

const getFavoriteController = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id  
    const result = await favoriteServices.getFavorite(userId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Favorite fetched successfully", data: result, success: true })      
})  

const deleteFavoriteController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string
    const result = await favoriteServices.deleteFavorite(id)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Favorite deleted successfully", data: result, success: true })      
})            

export const favoriteController = {
    addFavoriteController,
    getFavoriteController,
    deleteFavoriteController,
}