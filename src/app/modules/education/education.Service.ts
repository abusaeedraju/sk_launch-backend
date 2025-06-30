import { Education } from "@prisma/client";
import { prisma } from "../../../utils/prisma";

const createEducation = async (payload: Education) => {
  const education = await prisma.education.create({
    data: {
      ...payload,
    },
  });
  return education;
};

const deleteEducation = async (id: string, userId: string) => {
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
};