import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { experienceService } from "./experience.Service";
import sendResponse from "../../middleware/sendResponse";
import { StatusCodes } from "http-status-codes";

const createExperienceController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.user;
    const body = req.body;

    const payload = {...body, userId: id}
    const result = await experienceService.createExperience(payload);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Experience Added successfully",
      data: result,
      success: true,
    });
  }
);


const updateExperienceController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    const result = await experienceService.updateExperience(id, body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Experience updated successfully",
      data: result,
      success: true,
    });
  }
);

const deleteExperienceController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const result = await experienceService.deleteExperience(id, userId);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Experience deleted successfully",
      data: result,
      success: true,
    });
  }
);

export const experienceController = {
  createExperienceController,
  deleteExperienceController,
  updateExperienceController
};
