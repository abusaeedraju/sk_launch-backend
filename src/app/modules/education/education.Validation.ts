import { z } from "zod";

const createEducationValidation = z.object({
  institute: z.string({ required_error: "Institute is required" }),
  degreeName: z.string({ required_error: "Degree is required" }),
  fieldOfStudy: z.string({ required_error: "Field of study is required" }),
  startDate: z.string({ required_error: "Start date is required" }),
  endDate: z.string({ required_error: "End date is required" }),
  grade: z.number({ required_error: "Grade is required" }),
  description: z.string({ required_error: "Description is required" }).optional(),
});

export const educationValidation = { createEducationValidation };