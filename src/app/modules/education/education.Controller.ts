import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../middleware/sendResponse";
import { StatusCodes } from "http-status-codes";
import { educationService } from "./education.Service";

const createExperienceController = catchAsync(
  async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const body = req.body;
    const payload = { ...body, userId };
    const result = await educationService.createEducation(payload);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Create eduction successfully",
      success: true,
      data: result,
    });
  }
);


const updateExperienceController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    const result = await educationService.updateEducation(id, body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Experience updated successfully",
      success: true,
      data: result,
    });
  }
);


const deleteExperienceController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const result = await educationService.deleteEducation(id, userId);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Experience deleted successfully",
      success: true,
      data: result,
    });
  }
);

export const educationController = {
  createExperienceController,
  deleteExperienceController,
  updateExperienceController
};
