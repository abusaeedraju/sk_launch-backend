import { z } from "zod";

const createExperienceValidation = z.object({
  title: z.string({ required_error: "Title is required" }),
  type: z.string({ required_error: "Type is required" }),
  company: z.string({ required_error: "Company is required" }),
  startDate: z.string({ required_error: "Start date is required" }),
  endDate: z.string({ required_error: "End date is required" }),
});

export const experienceValidation= { createExperienceValidation }