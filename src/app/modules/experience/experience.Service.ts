import { Experience } from "@prisma/client";
import { prisma } from "../../../utils/prisma";
import ApiError from "../../error/ApiErrors";
import { StatusCodes } from "http-status-codes";

const createExperience = async (payload: Experience) => {
  const experience = await prisma.experience.create({
    data: {
      ...payload,
    },
  });
  return experience;
};

const updateExperience = async (id: string, payload: any) => {
  const findExperience = await prisma.experience.findUnique({
    where: {
      id,
    },
  });
  if (!findExperience) {
    throw new Error("Experience not found");
  }

  const experience = await prisma.experience.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });
  return experience;
};

const deleteExperience = async (id: string, userId: string) => {
  const findExperience = await prisma.experience.findUnique({
    where: {
      id,
      userId,
    },
  })
  if (!findExperience) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Experience not found")
  }
  const experience = await prisma.experience.delete({
    where: {
      id,
      userId,
    },
  });
  return experience;
};

export const experienceService = {
  createExperience,
  deleteExperience,
  updateExperience
};
