import { Education } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import ApiError from "../../error/ApiErrors";
import { StatusCodes } from "http-status-codes";

const createEducation = async (payload: Education) => {
  const education = await prisma.education.create({
    data: {
      ...payload,
    },
  });
  return education;
};

const updateEducation = async (id: string, payload: any) => {
  const findEducation = await prisma.education.findUnique({
    where: {
      id,
    },
  });
  if (!findEducation) {
    throw new Error("Education not found");
  }

  const education = await prisma.education.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });
  return education;
};  

const deleteEducation = async (id: string, userId: string) => {
  const findEducation = await prisma.education.findUnique({
    where: {
      id,
      userId
    },
  })
  if (!findEducation) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Education not found")
  }
  const education = await prisma.education.delete({
    where: {
      id,
      userId,
    },
  });
  return education;
};

export const educationService = {
  createEducation,
  deleteEducation,
  updateEducation
};