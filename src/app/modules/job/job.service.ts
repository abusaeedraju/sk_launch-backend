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
interface JobQueryOptions {
    employmentType?: 'FULLTIME' | 'PARTTIME' | 'HYBRID' | 'REMOTE';
    search?: string;
}
export const getJobs = async (options: JobQueryOptions = {}) => {
    const { employmentType, search } = options;

    const jobs = await prisma.job.findMany({
        where: {
            ...(employmentType && {
                employmentType: employmentType,
            }),
            ...(search && {
                name: {
                    contains: search,
                    mode: 'insensitive', // case-insensitive search
                },
            }),
        },
        include: {
            company: {
                select: {
                    id: true,
                    name: true,
                    logoImage: true,
                }
            },
            _count: {
                select: {
                    Application: true
                },
            },

        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return jobs;
};


const getSingleJob = async (id: string) => {
    const result = await prisma.job.findUnique({
        where: {
            id
        },
        include: {
            company: {
                select: {
                    id: true,
                    name: true,
                    logoImage: true,
                }
            },
            Application: {
                select: {
                    id: true,
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
    })
    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Job not found")
    }

    return result
}

export const jobServices = {
    createJob,
    editJob,
    deleteJob,
    getSingleJob,
    getJobs
}