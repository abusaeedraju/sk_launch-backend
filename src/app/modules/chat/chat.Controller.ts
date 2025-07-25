import { Request, Response } from 'express';
import { chatServices } from './chat.Service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../middleware/sendResponse';
import { StatusCodes } from 'http-status-codes';


// Create a new conversation (chatroom) between two users
const createConversation = catchAsync(async (req: Request, res: Response) => {
  const { user1Id, user2Id } = req.body;
  const result = await chatServices.createConversationIntoDB(user1Id, user2Id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Conversation created successfully',
    data: result,
  });
});


// Get a specific chatroom (conversation) between two users
const getConversationByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const { user1Id, user2Id } = req.query;
    const result = await chatServices.getMessagesByConversationIntoDB(
      user1Id as string,
      user2Id as string,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Chatroom messages retrieved successfully',
      data: result,
    });
  },
);

// Get a single chatroom (conversation) by conversation ID
const getSingleMassageConversation = catchAsync(
  async (req: Request, res: Response) => {
    const id1 = req.params.id1;
    const id2 = req.params.id2;
    const result = await chatServices.getMessagesByConversationIntoDB(id1, id2);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Chatroom retrieved successfully',
      data: result,
    });
  },
);

// Send a message in a specific conversation (chatroom)
const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const { conversationId, senderId, senderName, content, file } = req.body;
  const result = await chatServices.createMessageIntoDB(
    conversationId,
    senderId,
    senderName,
    content,
    file
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Message sent successfully",
    data: result,
  });
});

// Get all messages in a specific chatroom (conversation)
const getMessages = catchAsync(async (req: Request, res: Response) => {
  const { user1Id, user2Id } = req.query;
  const result = await chatServices.getMessagesByConversationIntoDB(
    user1Id as string,
    user2Id as string
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Messages retrieved successfully",
    data: result,
  });
});
const getUserChat = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await chatServices.getChatUsersForUser(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "chat users retrieved successfully",
    data: result,
  });
});

// Delete a specific message in a specific chatroom (conversation)
const deleteConversion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await chatServices.deleteConversation(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "conversation deleted successfully",
    data: result,
  });
});

const getMyChat = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user.id;
    const result = await chatServices.getMyChat(userId);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Chat Retrieve successfully",
      data: result,
    });
  }
);

const searchUser = catchAsync(async (req: Request, res: Response) => {
  const options = req.query;
  const result = await chatServices.searchUser(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users Retrieve successfully",
    data: result,
  });
});

// const generateFile = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.user.id;
//   const files = req.file;
//   const result = await chatServices.generateFile(userId, files);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "File Retrieve successfully",
//     data: result,
//   });
// });


const chatWithAIController = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body as any;
  const {id} = req.user;
  const result = await chatServices.chatWithAI(payload, id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Chat with AI successfully",
    data: result,
  });
});

export const ChatControllers = {
  createConversation,
  sendMessage,
  getMessages,
  getConversationByUserId,
  getSingleMassageConversation,
  getUserChat,
  deleteConversion,
  getMyChat,
  searchUser,
  chatWithAIController
  // generateFile,
};
