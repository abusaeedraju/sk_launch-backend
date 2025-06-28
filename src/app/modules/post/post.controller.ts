
import { StatusCodes } from "http-status-codes"
import sendResponse from "../../middleware/sendResponse"
import { Request, Response } from "express"
import { postServices } from "./post.server"
import catchAsync from "../../../shared/catchAsync"

const createPostController = catchAsync(async (req: Request, res: Response) => {
    const body = req?.body as any
    const { id: userId } = req?.user
    const image = req?.files as any
    const result = await postServices.createPost(body, userId, image)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Post created successfully", data: result, success: true })
})

const editPostController = catchAsync(async (req: Request, res: Response) => {
    const { postId } = req?.params
    const bodyData = req?.body as any
    const image = req?.files as any
    const result = await postServices.editPost(postId, bodyData, image)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Post updated successfully", data: result, success: true })
})

const deletePostController = catchAsync(async (req: Request, res: Response) => {
    const { postId } = req?.params
    const result = await postServices.deletePost(postId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Post deleted successfully", data: result, success: true })
})

const getAllPostController = catchAsync(async (req: Request, res: Response) => {
    const result = await postServices.getAllPost()
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Post fetched successfully", data: result, success: true })
})

const getSinglePostController = catchAsync(async (req: Request, res: Response) => {
    const { postId } = req?.params
    const result = await postServices.getSinglePost(postId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Post fetched successfully", data: result, success: true })
})      

const createRepostController = catchAsync(async (req: Request, res: Response) => {
    const { postId } = req?.params
    const bodyData = req?.body as any
    const userId = req?.user?.id
    const result = await postServices.createRepost(bodyData, postId, userId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Post fetched successfully", data: result, success: true })
})

const getSingleUserPostController = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req?.params
    const result = await postServices.getSingleUserPost(userId)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Post fetched successfully", data: result, success: true })
})

    export const postController = {
    createPostController,
    editPostController,
    deletePostController,
    getAllPostController,
    getSinglePostController,
    createRepostController,
    getSingleUserPostController
}
