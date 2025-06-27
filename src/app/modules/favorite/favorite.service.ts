import { prisma } from "../../../utils/prisma"
import ApiError from "../../error/ApiErrors"
import { StatusCodes } from "http-status-codes"

const addFavorite = async (userId: string, jobId: string) => {
        const isFavorite = await prisma.favorite.findFirst({
            where: {
                jobId,
                userId,
            }
        })
        console.log("isFavorite",isFavorite)
        if (isFavorite) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Favorite already exists")
        }
        const result = await prisma.favorite.create({
            data: {
                jobId,
                userId,
            }
        })
        return result
}       

const getFavorite = async (userId: string) => {
        const result = await prisma.favorite.findMany({
            where: {
                userId,
            },include: {
                job: true,
            }
        })
        if(result.length === 0){
            throw new ApiError(StatusCodes.NOT_FOUND, "Favorite list is empty")
        }
        return result
}           

const deleteFavorite = async (id: string) => {
        const result = await prisma.favorite.delete({
            where: {id
            }
        })
        return result
}           
    


export const favoriteServices = {
    addFavorite,
    getFavorite,
    deleteFavorite,
}
    