import { prisma } from "../../../utils/prisma"
import ApiError from "../../error/ApiErrors"
import { StatusCodes } from "http-status-codes"
import { User } from "@prisma/client"
import { notificationServices } from "../notifications/notification.service"

const createApplication = async (userId: string, jobId: string) => {

    const job = await prisma.job.findUnique({
        where: {
            id: jobId,
        }
    })
    if (!job) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Job not found")
    }

    const isApplied = await prisma.jobApplication.findFirst({
        where: {
            userId,
            jobId,
        }
    })
    if (isApplied) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "You have already applied for this job")
    }
    const result = await prisma.jobApplication.create({
        data: {
            userId,
            jobId,
        }
    })

    const payload = {
        title: "New Job Application",
        body: `You have a new job application for ${job.name}`,
        jobId: job.id
    }

    await notificationServices.sendSingleNotification(userId, job.companyId, payload)

    return result
}

const getAppliedJob = async (userId: string) => {
  const result = await prisma.jobApplication.findMany({
    where: {
      userId,
      status: "APPLIED",
    },
    include: {
      job: {
        select: {
          id: true,
          name: true,
          salary: true,
          company: {
            select: {
              id: true,
              name: true,
              logoImage: true,
            },
          },
        },
      },
    },
  });
  if (result.length === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Application list is empty");
  }
  return result;
};

const applicantProfileView = async (applicationId: string) => {
  const result = await prisma.jobApplication.findUnique({
    where: {
      id: applicationId,
    },
    include: {
      user: true,
    },
  });
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Application not found");
  }
  const {
    password,
    fcmToken,
    role,
    status,
    createdAt,
    updatedAt,
    email,
    customerId,
    connectAccountId,
    isVerified,
    companyType,
    establishmentYear,
    yearsOfBusinesses,
    operationCountry,
    totalEmployees,
    hiringFromShuroo,
    about,
    logoImage,
    coverImage,
    ...rest
  } = result?.user as User;
  const updatedReult = {
    ...result,
    user: rest,
  };
  await prisma.jobApplication.update({
    where: {
      id: applicationId,
    },
    data: {
      isProfileViewed: true,
    },
  });
  return updatedReult;
};

const getProfileViewedJob = async (userId: string) => {
  const result = await prisma.jobApplication.findMany({
    where: {
      userId,
      isProfileViewed: true,
      status: "APPLIED",
    },
    include: {
      job: {
        select: {
          id: true,
          name: true,
          salary: true,
          company: {
            select: {
              id: true,
              name: true,
              logoImage: true,
            },
          },
        },
      },
    },
  });
  if (result.length === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Application list is empty");
  }
  return result;
};

const shortlistApplication = async (id: string) => {
  const result = await prisma.jobApplication.update({
    where: {
      id,
    },
    data: {
      status: "SHORTLISTED",
    },
    include : {
      job: {
        select: {
          id: true,
          name: true,
          salary: true,
          company: {
            select: {
              id: true,
              name: true,
              logoImage: true,
            },
          },
        },
      },
    }
  });

  await notificationServices.sendSingleNotification(
    result.userId as string,
    result.job.company.id as string,
    {
      title: "Shortlisted",
      body: `You have been shortlisted for ${result.job.name}`,
    }
  );

  return result;
};

const getShortlistedJob = async (userId: string) => {
  const result = await prisma.jobApplication.findMany({
    where: {
      userId,
      status: "SHORTLISTED",
    },
    include: {
      job: {
        select: {
          id: true,
          name: true,
          salary: true,
          company: {
            select: {
              id: true,
              name: true,
              logoImage: true,
            },
          },
        },
      },
    },
  });
  if (result.length === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Application list is empty");
  }
  return result;
};

const interviewApplication = async (id: string) => {
  const result = await prisma.jobApplication.update({
    where: {
      id,
    },
    data: {
      status: "INTERVIEW",
    },
  });
  return result;
};

const getInterviewJob = async (userId: string) => {
  const result = await prisma.jobApplication.findMany({
    where: {
      userId,
      status: "INTERVIEW",
    },
    include: {
      job: {
        select: {
          id: true,
          name: true,
          salary: true,
          company: {
            select: {
              id: true,
              name: true,
              logoImage: true,
            },
          },
        },
      },
    },
  });
  if (result.length === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Application list is empty");
  }
  return result;
};

export const applicationServices = {
  createApplication,
  getAppliedJob,
  getProfileViewedJob,
  getShortlistedJob,
  getInterviewJob,
  applicantProfileView,
  shortlistApplication,
  interviewApplication,
};
