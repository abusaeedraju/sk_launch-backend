import { User } from "@prisma/client";
import ApiError from "../../error/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { compare, hash } from "bcrypt";
import { OTPFn } from "../../helper/OTPFn";
import { getImageUrl } from "../../helper/uploadFile";
import { prisma } from "../../../utils/prisma";

const createUserIntoDB = async (payload: User) => {
  const findUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (findUser && findUser?.isVerified) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User already exists");
  }
  if (findUser && !findUser?.isVerified) {
    await OTPFn(payload.email);
    return;
  }
  const role: any = payload.role?.toUpperCase();
  const newPass = await hash(payload.password, 10);

  const result = await prisma.user.create({
    data: {
      ...payload,
      password: newPass,
      role: role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  OTPFn(payload.email);
  return result;
};

const changePasswordIntoDB = async (id: string, payload: any) => {
  const findUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!findUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  try {
    const isMatch = await compare(payload.oldPassword, findUser.password);
    if (!isMatch) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Old password is incorrect");
    }
    const newPass = await hash(payload.newPassword, 10);
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: newPass,
      },
    });
    return;
  } catch {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Old password is incorrect");
  }
};

const updateUserIntoDB = async (
  id: string,
  payload: any,
  profileImage: any,
  logoImage: any,
  coverImage: any,
  videoProfile: any
) => {
  const findUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!findUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  if (findUser?.role === "COMPANY") {
    const cover = coverImage && (await getImageUrl(coverImage));
    const logo = logoImage && (await getImageUrl(logoImage));

    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: payload.name,
        companyType: payload.companyType,
        establishmentYear: payload.establishmentYear,
        yearsOfBusinesses: payload.yearsOfBusinesses,
        operationCountry: payload.operationCountry,
        totalEmployees: payload.totalEmployees,
        hiringFromShuroo: payload.hiringFromShuroo,
        about: payload.about,
        coverImage: cover ?? undefined,
        logoImage: logo ?? undefined,
      },
    });
    const updateDetails = {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
      companyType: result.companyType,
      establishmentYear: result.establishmentYear,
      yearsOfBusinesses: result.yearsOfBusinesses,
      operationCountry: result.operationCountry,
      totalEmployees: result.totalEmployees,
      hiringFromShuroo: result.hiringFromShuroo,
      about: result.about,
      coverImage: result.coverImage,
      logoImage: result.logoImage,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    return updateDetails;
  } else if (findUser?.role === "USER") {
    const userImage = profileImage && (await getImageUrl(profileImage));
    const videoProfileLink = videoProfile && (await getImageUrl(videoProfile));

    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: payload.name,
        phone: payload.phone,
        country: payload.country,
        state: payload.state,
        city: payload.city,
        image: userImage ?? undefined,
        videoProfile: videoProfileLink ?? undefined,
      },
    });
    const updateDetails = {
      id: result.id,
      name: result.name,
      email: result.email,
      image: result.image,
      role: result.role,
      phone: result.phone,
      country: result.country,
      state: result.state,
      city: result.city,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    return updateDetails;
  }
};

const getMyProfile = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      Post: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              logoImage: true,
            },
          },
        },
      },
      Job: {
        include: {
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

  return result;
};

export const userServices = {
  createUserIntoDB,
  updateUserIntoDB,
  changePasswordIntoDB,
  getMyProfile,
};
