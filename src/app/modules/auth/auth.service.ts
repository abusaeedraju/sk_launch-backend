import { PrismaClient, Role } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { jwtHelpers } from "../../helper/jwtHelper";
import { JwtPayload, Secret } from "jsonwebtoken";
import ApiError from "../../error/ApiErrors";
import { OTPFn } from "../../helper/OTPFn";
import OTPVerify from "../../helper/OTPVerify";
import { StatusCodes } from "http-status-codes";
import { stripe } from "../../../config/stripe";
import { createStripeCustomerAcc } from "../../helper/createStripeCustomerAcc";

const prisma = new PrismaClient();
const logInFromDB = async (payload: {
  email: string;
  password: string;
  fcmToken?: string;
}) => {
  const findUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!findUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  const comparePassword = await compare(payload.password, findUser.password);
  if (!comparePassword) {
    throw new ApiError(
      StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      "Invalid password"
    );
  }

  if (findUser.status === "PENDING") {
    OTPFn(findUser.email);
    throw new ApiError(
      401,
      "Please check your email address to verify your account"
    );
  }

  if (payload.fcmToken) {
    await prisma.user.update({
      where: {
        email: payload.email,
      },
      data: {
        fcmToken: payload.fcmToken,
      },
    });
  }
  const userInfo = {
    email: findUser.email,
    name: findUser.name,
    id: findUser.id,
    image: findUser.image,
    role: findUser.role,
    status: findUser.status,
    fcmToken: findUser.fcmToken,
  };
  const token = jwtHelpers.generateToken(userInfo, { expiresIn: "24 hr" });
  return { accessToken: token, ...userInfo };
};

const verifyOtp = async (payload: { email: string; otp: number }) => {
  const { message, accessToken } = await OTPVerify(payload);

  if (message) {
    const updateUserInfo = await prisma.user.update({
      where: {
        email: payload.email 
      },
      data: {
        status: "ACTIVE",
        isVerified: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    await createStripeCustomerAcc(updateUserInfo);
    return {updateUserInfo, accessToken};
  }
};

const resetOtpVerify = async (payload: { email: string; otp: number }) => {
  const {accessToken } = await OTPVerify(payload);

  return accessToken;

};
const forgetPassword = async (payload: { email: string }) => {
  const findUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!findUser) {
    throw new Error("User not found");
  }

  OTPFn(findUser.email);
  return;
};

const resendOtp = async (payload: { email: string }) => {
  const findUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!findUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  OTPFn(findUser.email);
};



 const socialLogin = async (payload: {
  email: string;
  name: string;
  role: Role;
  image?: string;
  fcmToken?: string;
}) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email.trim(),
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      customerId: true,
      status: true,
      connectAccountId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (userData) {
    const accessToken = jwtHelpers.generateToken(
      { id: userData.id, email: userData.email, role: userData.role },
      { expiresIn: "24 hr" }
    );
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      customerId: userData.customerId,
      image: userData?.image,
      status: userData.status,
      accessToken: accessToken,
    };
  } else {
    const role: any = payload.role.toUpperCase();
    const result = await prisma.user.create({
      data: {
        ...payload,
        role: role,
        password: "",
        status: "ACTIVE",
        isVerified: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    /* const stripeCustomer = await stripe.customers.create({
      email: payload.email.trim(),
      name: payload.name || undefined,
    });

    if (!stripeCustomer.id) {
      throw new ApiError(
        StatusCodes.EXPECTATION_FAILED,
        "Failed to create a Stripe customer"
      );
    }

    await prisma.user.update({
      where: { id: result.id },
      data: { customerId: stripeCustomer.id },
    });*/

    const accessToken = jwtHelpers.generateToken(
      { id: result.id, email: result.email, role: result.role },
      { expiresIn: "24 hr" }
    ); 
    return {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
      image: result?.image,
      status: result.status,
      accessToken: accessToken,
    };
  }
}; 

const appleLogin = async (payload: {
  token: string;
  name?: string;
  image?: string;
  fcmToken?: string;
}) => {
const {email} = jwtHelpers.tokenDecoder(payload.token) as JwtPayload;

  const userData = await prisma.user.findUnique({
    where: {
      email: email.trim(),
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      customerId: true,
      status: true,
      connectAccountId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (userData) {
    const accessToken = jwtHelpers.generateToken(
      { id: userData.id, email: userData.email, role: userData.role },
      { expiresIn: "24 hr" }
    );
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      customerId: userData.customerId,
      image: userData?.image,
      status: userData.status,
      accessToken: accessToken,
    };
  } else {
    const result = await prisma.user.create({
      data: {
        name: payload?.name,
        email: email.trim(),
        role: "USER",
        password: "",
        status: "ACTIVE",
        isVerified: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    /* const stripeCustomer = await stripe.customers.create({
      email: payload.email.trim(),
      name: payload.name || undefined,
    });

    if (!stripeCustomer.id) {
      throw new ApiError(
        StatusCodes.EXPECTATION_FAILED,
        "Failed to create a Stripe customer"
      );
    }

    await prisma.user.update({
      where: { id: result.id },
      data: { customerId: stripeCustomer.id },
    });*/

    const accessToken = jwtHelpers.generateToken(
      { id: result.id, email: result.email, role: result.role },
      { expiresIn: "24 hr" }
    ); 
    return {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
      image: result?.image,
      status: result.status,
      accessToken: accessToken,
    };
  }
}; 

const resetPassword = async (payload: { token: string; password: string }) => {
const {email} = jwtHelpers.tokenDecoder(payload.token) as JwtPayload;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!findUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  const hashedPassword = await hash(payload.password, 10);
  const result = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      password: hashedPassword,
    },
    select: {
      name: true,
      email: true,
    }
  });
  return result;
};

export const authService = {
  logInFromDB,
  forgetPassword,
  verifyOtp,
  resendOtp,
  socialLogin,
  resetOtpVerify,
  resetPassword,
  appleLogin
};
