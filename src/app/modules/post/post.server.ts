import { StatusCodes } from "http-status-codes"
import { prisma } from "../../../utils/prisma"
import ApiError from "../../error/ApiErrors"

const createPost = async (payload: any, userId: string, image: any[]) => {
    try {
        const imageUrls: string[] = image?.map(file => file.location);

        const result = await prisma.post.create({
            data: {
                ...payload,
                userId,
                image: imageUrls
            }
        })
        return result
    } catch (error) {
        console.log(error)
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create post")
    }
}

const editPost = async (id: string, payload: any, image: any[]) => {

    try {
        const result = await prisma.$transaction(async (tx) => {
            const post = await tx.post.findUnique({ where: { id } });
            const repost = !post ? await tx.repost.findUnique({ where: { id } }) : null;

            if (!post && !repost) {
                throw new ApiError(StatusCodes.NOT_FOUND, "Post or repost not found");
            }

            if (post) {
                const imageUrls: string[] = image?.map(file => file.location);
                const update = await tx.post.update({
                    where: {
                        id
                    },
                    data: {
                        ...payload,
                        image: imageUrls
                    }
                });
                return { type: 'post', update };
            }

            if (repost) {
                const update = await tx.repost.update({
                    where: {
                        id
                    },
                    data: {
                        ...payload
                    }
                });
                return { type: 'repost', update };
            }
        });

        return result
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to update post , maybe post not found")
    }
}

const deletePost = async (id: string) => {

    try {
        const result = await prisma.$transaction(async (tx) => {
            const post = await tx.post.findUnique({ where: { id } });
            const repost = !post ? await tx.repost.findUnique({ where: { id } }) : null;

            if (!post && !repost) {
                throw new ApiError(StatusCodes.NOT_FOUND, "No post found with this ID.");
            }

            if (post) {
                await tx.post.delete({ where: { id } });
                return { type: 'post', status: 'deleted' };
            }

            if (repost) {
                await tx.repost.delete({ where: { id } });
                return { type: 'repost', status: 'deleted' };
            }
        });

        console.log(result);
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to delete post, maybe post not found")
    }

}

const getAllPost = async () => {
    try {

        const result = await prisma.$transaction(async (tx) => {
            const posts = await tx.post.findMany({
                select: {
                    id: true,
                    userId: true,
                    content: true,
                    image: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        }
                    }
                }
            })

            const reposts = await tx.repost.findMany({
                select: {
                    id: true,
                    userId: true,
                    postId: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        }
                    },
                    post: {
                        select: {
                            id: true,
                            userId: true,
                            content: true,
                            image: true,
                            createdAt: true,
                            updatedAt: true,
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true,
                                }
                            },
                        }
                    }
                }
            })

            const combinedPosts = [...posts, ...reposts];
            const sortedPosts = combinedPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            return sortedPosts
        })
        return result
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to get all posts")
    }
}

const getSinglePost = async (id: string) => {
    const result = await prisma.$transaction(async (tx) => {
        // Try finding in Post
        const post = await tx.post.findUnique({
            where: { id }, select: {
                id: true,
                userId: true,
                content: true,
                image: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    }
                }
            }
        });

        // If not found in Post, try Repost
        if (post) {
            return { type: 'post', data: post };
        }

        const repost = await tx.repost.findUnique({
            where: { id }, select: {
                id: true,
                userId: true,
                postId: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    }
                },
                post: {
                    select: {
                        id: true,
                        userId: true,
                        content: true,
                        image: true,
                        createdAt: true,
                        updatedAt: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                            }
                        }
                    }
                }
            }
        });

        if (repost) {
            return { type: 'repost', data: repost };
        }

        // Not found in either
        throw new ApiError(StatusCodes.NOT_FOUND, "Post or Repost not found with this ID.");
    });

    return result;
}

const createRepost = async (payload: any, postId: string, userId: string) => {
    const result = await prisma.repost.create({
        data: {
            ...payload,
            userId,
            postId,
        }, select: {
            id: true,
            userId: true,
            postId: true,
            content: true,
            createdAt: true,
            updatedAt: true,
        }
    })
    return result
}

const getSingleUserPost = async (userId: string) => {
    const result = await prisma.$transaction(async (tx) => {
        // Try finding in Post
        const post = await tx.post.findMany({
            where: { userId }, select: {
                id: true,
                userId: true,
                content: true,
                image: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    }
                }
            }
        });

        // If not found in Post, try Repost
        if (post) {
            return { type: 'post', data: post };
        }

        const repost = await tx.repost.findMany({
            where: { userId }, select: {
                id: true,
                userId: true,
                postId: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    }
                },
                post: {
                    select: {
                        id: true,
                        userId: true,
                        content: true,
                        image: true,
                        createdAt: true,
                        updatedAt: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                            }
                        }
                    }
                }
            }
        });

        if (repost) {
            return { type: 'repost', data: repost };
        }

        // Not found in either
        throw new ApiError(StatusCodes.NOT_FOUND, "Post or Repost not found with this ID.");
    });

    return result;
}

export const postServices = {
    createPost,
    editPost,
    deletePost,
    getAllPost,
    getSinglePost,
    createRepost,
    getSingleUserPost
}
