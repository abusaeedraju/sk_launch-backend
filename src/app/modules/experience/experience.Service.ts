import { Experience } from "@prisma/client";
import { prisma } from "../../../utils/prisma";

const createExperience = async (payload: Experience) => {
    const experience = await prisma.experience.create({
        data: {
            ...payload,
        },
    });
    return experience;
};


const deleteExperience = async (id: string, userId: string) => {
    const experience = await prisma.experience.delete({
        where: {
            id,
            userId
        },
    });
    return experience;
};


export const experienceService = {
    createExperience,
    deleteExperience,
};