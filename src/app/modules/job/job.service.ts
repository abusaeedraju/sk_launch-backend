import { StatusCodes } from "http-status-codes"
import { prisma } from "../../../utils/prisma"
import ApiError from "../../error/ApiErrors"

const createJob = async (payload: any, companyId: string) => {

    try {
        const result = await prisma.job.create({
            data: {
                ...payload,
                companyId
            }
        })

        return result
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create job")
    }


}

const editJob = async (id: string, payload: any) => {

    try {
        const result = await prisma.job.update({
            where: {
                id
            },
            data: {
                ...payload
            }
        })

        return result
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to update job")
    }
}

const deleteJob = async (id: string) => {

    try {
        const result = await prisma.job.delete({
            where: {
                id
            }
        })    
        return result
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to delete job")
    }
}
 
const getAllJob = async () => {
    try {
        const result = await prisma.job.findMany()
        return result
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to get all jobs")
    }
}

const getSingleJob = async (id: string) => {
    try {
        const result = await prisma.job.findUnique({
            where: {
                id
            }
        })
        return result
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to get single job")
    }
}

export const jobServices = {
    createJob,
    editJob,
    deleteJob,
    getAllJob,
    getSingleJob
}