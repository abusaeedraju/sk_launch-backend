import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../middleware/sendResponse";
import { StatusCodes } from "http-status-codes";
import { authService } from "./auth.service";

const logInUserController = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.logInFromDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User login successfully",
    data: result,
  });
});

const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body as any;
  const result = await authService.verifyOtp(payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "OTP verified successfully",
    data: result,
  });
});


const resetOtpVerifyController = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await authService.resetOtpVerify(body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "OTP verified successfully",
    data: result,
  });
})
const forgetPasswordController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.forgetPassword(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "OTP sent to your email, provide it to verify",
      data: result,
    });
  }
);


const resendOtpController = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await authService.resendOtp(body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "OTP sent to your email again, provide it to verify",
    data: result,
  });
});


const socialLoginController = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await authService.socialLogin(body);
  sendResponse(res, {statusCode : StatusCodes.OK, success : true, message : "User login successfully", data : result});
})

const resetPasswordController = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;

  const result = await authService.resetPassword(body);
  sendResponse(res, {statusCode : StatusCodes.OK, success : true, message : "New password create successfully", data : result});
})

export const authController = {
  logInUserController,
  forgetPasswordController,
  verifyOtp,
  resendOtpController,
  socialLoginController,
  resetOtpVerifyController,
  resetPasswordController
};
