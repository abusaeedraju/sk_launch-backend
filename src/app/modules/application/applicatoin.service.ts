import { prisma } from "../../../utils/prisma"
import ApiError from "../../error/ApiErrors"
import { StatusCodes } from "http-status-codes"

const createApplication = async (userId: string, jobId: string) => {
    const result = await prisma.jobApplication.create({
        data: {
            userId,
            jobId,
        }
    })
    return result
}

const getAppliedJob  = async (userId: string) => {
    const result = await prisma.jobApplication.findMany({
        where: {
            userId,
        },
        include: {  
            job: true,
        }
    })
    if(result.length === 0){
        throw new ApiError(StatusCodes.NOT_FOUND, "Application list is empty")
    }
    return result
}

const applicantProfileView = async (applicationId: string) => {
    const result = await prisma.jobApplication.findUnique({
        where: {
            id: applicationId,
        },    
        include: {
            user: true,
        }
    })
    return result
}

const getProfileViewedJob = async (userId: string) => {
    const result = await prisma.jobApplication.findMany({
        where: {
            userId,
            status: "PROFILEVIEW",
        },
        include: {
            job: true,
        }
    })
    if(result.length === 0){
        throw new ApiError(StatusCodes.NOT_FOUND, "Application list is empty")
    }
    return result
}

const  shortlistApplication = async (id: string) => {
    const result = await prisma.jobApplication.update({
        where: {
            id,
        },
        data: {
            status: "SHORTLISTED",
        }
    })
    return result
}

const getShortlistedJob = async (userId: string) => {
    const result = await prisma.jobApplication.findMany({
        where: {
            userId,
            status: "SHORTLISTED",
        },
        include: {
            job: true,
        }
    })
    if(result.length === 0){
        throw new ApiError(StatusCodes.NOT_FOUND, "Application list is empty")
    }
    return result
}

const interviewApplication = async (id: string) => {
    const result = await prisma.jobApplication.update({
        where: {
            id,
        },
        data: {
            status: "INTERVIEW",
            }
    })
    return result
}   

const getInterviewJob = async (userId: string) => {
    const result = await prisma.jobApplication.findMany({
        where: {
            userId,
            status: "INTERVIEW",
        },
        include: {
            job: true,
        }
    })
    if(result.length === 0){
        throw new ApiError(StatusCodes.NOT_FOUND, "Application list is empty")
    }
    return result
}

export const applicationServices = {
    createApplication,
    getAppliedJob,
    getProfileViewedJob,
    getShortlistedJob,
    getInterviewJob,
    applicantProfileView,
    shortlistApplication,
    interviewApplication,
} 
