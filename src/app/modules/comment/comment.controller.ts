import catchAsync from "../../../shared/catchAsync";
import { commentServices } from "./comment.service";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../middleware/sendResponse";
import { Request, Response } from "express";

const createCommentController = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body as any
    const {id: userId} = req.user
    const {postId} = req.params
    const result = await commentServices.createComment(payload, postId, userId)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Comment created successfully", data: result, success: true })
})  

const editCommentController = catchAsync(async (req: Request, res: Response) => {
    const {commentId} = req.params
    const payload = req.body as any
    const {id: userId} = req.user
    const result = await commentServices.editComment(commentId, userId, payload)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Comment updated successfully", data: result, success: true })
})

const deleteCommentController = catchAsync(async (req: Request, res: Response) => {
    const {commentId} = req.params
    const {id: userId} = req.user
    const result = await commentServices.deleteComment(commentId, userId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Comment deleted successfully", data: result, success: true })
})

const getSingleCommentController = catchAsync(async (req: Request, res: Response) => {
    const {commentId} = req.params
    const result = await commentServices.getSingleComment(commentId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Comment fetched successfully", data: result, success: true })
})

const getCommentsController = catchAsync(async (req: Request, res: Response) => {
    const {postId} = req.params
    const result = await commentServices.getComments(postId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Comments fetched successfully", data: result, success: true })
})  

const createReplyCommentController = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body as any
    const {id: userId} = req.user
    const {commentId} = req.params
    const result = await commentServices.createReplyComment(payload, commentId, userId)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Reply comment created successfully", data: result, success: true })
})

const editReplyCommentController = catchAsync(async (req: Request, res: Response) => {
    const {replyCommentId} = req.params
    const payload = req.body as any
    const {id: userId} = req.user
    const result = await commentServices.editReplyComment(replyCommentId, userId, payload)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Reply comment updated successfully", data: result, success: true })
})

const deleteReplyCommentController = catchAsync(async (req: Request, res: Response) => {
    const {replyCommentId} = req.params
    const {id: userId} = req.user
    const result = await commentServices.deleteReplyComment(replyCommentId, userId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Reply comment deleted successfully", data: result, success: true })
})

const getSingleReplyCommentController = catchAsync(async (req: Request, res: Response) => {
    const {replyCommentId} = req.params
    const result = await commentServices.getSingleReplyComment(replyCommentId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Reply comment fetched successfully", data: result, success: true })
})

const getReplyCommentsController = catchAsync(async (req: Request, res: Response) => {
    const {commentId} = req.params
    const result = await commentServices.getReplyComments( commentId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Reply comments fetched successfully", data: result, success: true })
})  

export const commentController = { createCommentController, editCommentController, deleteCommentController, getSingleCommentController, getCommentsController, createReplyCommentController, editReplyCommentController, deleteReplyCommentController, getSingleReplyCommentController, getReplyCommentsController }
