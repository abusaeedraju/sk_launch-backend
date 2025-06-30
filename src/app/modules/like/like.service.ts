
import { StatusCodes } from "http-status-codes"
import ApiError from "../../error/ApiErrors"
import { prisma } from "../../../utils/prisma"

const createLike = async (userId: string, id: string) => {
    if (!userId) {
        throw new ApiError(StatusCodes.NOT_FOUND, "UserId not found")
    }
    if (!id) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Id not found")
    }


    // like for post
    const isExistLikeInPost = await prisma.like.findFirst({
        where: {
            userId: userId,
            postId: id
        }
    })
    if (isExistLikeInPost) {
        await prisma.like.delete({
            where: {
                id: isExistLikeInPost.id
            }
        })

        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        })
        if (post) {
            await prisma.post.update({
                where: {
                    id: id
                },
                data: {
                    totalLike: post.totalLike - 1
                }
            })
            return "Disliked"
        }
    } else {
        await prisma.like.create({
            data: {
                userId: userId,
                postId: id
            }
        })
        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        })
        if (post) {

            await prisma.post.update({
                where: {
                    id: id
                },
                data: {
                    totalLike: post.totalLike + 1
                }
            })
            return "Liked"
        }
    }

    // like for repost

    const isExistLikeInRepost = await prisma.like.findFirst({
        where: {
            userId: userId,
            repostId: id
        }
    })
    if (isExistLikeInRepost) {
        await prisma.like.delete({
            where: {
                id: isExistLikeInRepost.id
            }
        })

        const repost = await prisma.repost.findUnique({
            where: {
                id: id
            }
        })
        if (repost) {
            await prisma.repost.update({
                where: {
                    id: id
                },
                data: {
                    totalLike: repost.totalLike - 1
                }
            })
            return "Disliked"
        }
    } else {
        await prisma.like.create({
            data: {
                userId: userId,
                repostId: id
            }
        })
        const repost = await prisma.repost.findUnique({
            where: {
                id: id
            }
        })
        if (repost) {

            await prisma.repost.update({
                where: {
                    id: id
                },
                data: {
                    totalLike: repost.totalLike + 1
                }
            })
            return "Liked"
        }
    }
    // like for comment
    const isExistLikeInComment = await prisma.like.findFirst({
        where: {
            userId: userId,
            commentId: id
        }
    })
    if (isExistLikeInComment) {
        await prisma.like.delete({
            where: {
                id: isExistLikeInComment.id
            }
        })

        const comment = await prisma.comment.findUnique({
            where: {
                id: id
            }
        })
        if (comment) {
            await prisma.comment.update({
                where: {
                    id: id
                },
                data: {
                    totalLike: comment.totalLike - 1
                }
            })
        }
        return "Disliked"
    } else {
        await prisma.like.create({
            data: {
                userId: userId,
                commentId: id
            }
        })
        const comment = await prisma.comment.findUnique({
            where: {
                id: id
            }
        })
        if (comment) {
            await prisma.comment.update({
                where: {
                    id: id
                },
                data: {
                    totalLike: comment.totalLike + 1
                }
            })
            return "Liked"
        }
    }
    // like for reply comment
    const isExistLikeInReplyComment = await prisma.like.findFirst({
        where: {
            userId: userId,
            replyCommentId: id
        }
    })
    if (isExistLikeInReplyComment) {
        await prisma.like.delete({
            where: {
                id: isExistLikeInReplyComment.id
            }
        })

        const replyComment = await prisma.replyComment.findUnique({
            where: {
                id: id
            }
        })
        if (replyComment) {
            await prisma.replyComment.update({
                where: {
                    id: id
                },
                data: {
                    totalLike: replyComment.totalLike - 1
                }
            })
        }
        return "Disliked"
    } else {
        await prisma.like.create({
            data: {
                userId: userId,
                replyCommentId: id
            }
        })
        const replyComment = await prisma.replyComment.findUnique({
            where: {
                id: id
            }
        })
        if (replyComment) {
            await prisma.replyComment.update({
                where: {
                    id: id
                },
                data: {
                    totalLike: replyComment.totalLike + 1
                }
            })
            return "Liked"
        }
    }
}

export const LikeService = { createLike } 