import { prisma } from "../../../utils/prisma"
import ApiError from "../../error/ApiErrors"
import { StatusCodes } from "http-status-codes"

const createComment = async (payload: any, postId: string, userId: string) => {
    if(!payload.comment){
        throw new ApiError(StatusCodes.BAD_REQUEST, "comment is required")
    }

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    if(post){
        const result = await prisma.comment.create({
            data: {
                ...payload,
                userId,
                postId,
            }, select: {
                id: true,
                userId: true,
                postId: true,
                comment: true,
                createdAt: true,
                updatedAt: true,
            }
        })
        return result
    }
    const repost = await prisma.repost.findUnique({
        where: {
            id: postId
        }
    })
    if(repost){
        const result = await prisma.comment.create({
            data: {
                ...payload,
                userId,
                repostId: postId,
            }, select: {
                id: true,
                userId: true,
                repostId: true,
                comment: true,
                createdAt: true,
                updatedAt: true,
            }
        })
        return result
    }    
}   

const editComment = async (id: string,userId: string, payload: any) => {
    if(!payload.comment){
        throw new ApiError(StatusCodes.BAD_REQUEST, "comment is required")
    }
    const result = await prisma.comment.update({
        where: {
            id,
            userId
        },
        data: {
            ...payload,
            comment: payload.comment
        }
    })
    return result
}   

const deleteComment = async (id: string,userId: string) => {
    const result = await prisma.comment.delete({
        where: {
            id,
            userId
        }
    })
    return result
}   

const getSingleComment = async (id: string) => {
    console.log(id)
    const result = await prisma.comment.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            userId: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            },
            postId: true,
            comment: true,
            createdAt: true,
            updatedAt: true,
            ReplyComment: true,
        }
    })
    return result
}   
    
const getComments = async (postId: string) => {
    const result = await prisma.comment.findMany({
        where: {    
            postId
        },
        select: {
            id: true,
            userId: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            },
            postId: true,
            comment: true,
            createdAt: true,
            updatedAt: true,
            ReplyComment: true,
        }
    })
    return result
}       

const createReplyComment = async (payload: any, commentId: string, userId: string) => {
    if(!payload.replyComment){
        throw new ApiError(StatusCodes.BAD_REQUEST, "replyComment is required")
    }
    const result = await prisma.replyComment.create({
        data: {
            ...payload,
            userId,
            commentId,
        }, select: {    
            id: true,
            userId: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            },
            commentId: true,
            comment:{
                select: {
                    id: true,
                    userId: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true
                        }
                    },
                    createdAt: true,
                    updatedAt: true,
                }
            },
            replyComment: true,
            createdAt: true,
            updatedAt: true,
        }
    })
    return result
}

const editReplyComment = async (id: string,userId: string, payload: any) => {
    if(!payload.replyComment){
        throw new ApiError(StatusCodes.BAD_REQUEST, "replyComment is required")
    }
        const result = await prisma.replyComment.update({
        where: {
            id,
            userId
        },
        data: {
            ...payload,
            replyComment: payload.replyComment  
        }
    })
    return result
}   

const deleteReplyComment = async (id: string,userId: string) => {
    const result = await prisma.replyComment.delete({
        where: {
            id,
            userId
        }
    })
    return result
}   
    
const getSingleReplyComment = async (id: string) => {
    const result = await prisma.replyComment.findUnique({
        where: {
            id
        },select: {
            id: true,
            userId: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            },
            commentId: true,
            comment:{
                select: {
                    id: true,
                    userId: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true
                        }
                    },
                    createdAt: true,
                    updatedAt: true,
                }
            },
            replyComment: true,
            createdAt: true,
            updatedAt: true,
        }
    })
    return result
}   
    
const getReplyComments = async (commentId: string) => {
    const result = await prisma.replyComment.findMany({
        where: {
            commentId
        },
        select: {
            id: true,
            userId: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            },
            commentId: true,
            comment:{
                select: {
                    id: true,
                    userId: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true
                        }
                    },
                    postId: true,
                    comment: true,
                    createdAt: true,
                    updatedAt: true,
                }
            },
            replyComment: true,
            createdAt: true,
            updatedAt: true,
        }   
    })
    return result
}       

export const commentServices = { createComment, editComment, deleteComment, getSingleComment, getComments, createReplyComment, editReplyComment, deleteReplyComment, getSingleReplyComment, getReplyComments }  
