import { Router } from "express";
import auth from "../../middleware/auth";
import { commentController } from "./comment.controller";

const route = Router()

route.post("/create/:postId", auth(), commentController.createCommentController)
route.put("/update/:commentId", auth(), commentController.editCommentController)
route.delete("/delete/:commentId", auth(), commentController.deleteCommentController)
route.get("/post/:postId",auth(), commentController.getCommentsController)
route.get("/:commentId", auth(), commentController.getSingleCommentController)

route.post("/reply/create/:commentId", auth(), commentController.createReplyCommentController)
route.put("/reply/update/:replyCommentId", auth(), commentController.editReplyCommentController)
route.delete("/reply/delete/:replyCommentId", auth(), commentController.deleteReplyCommentController)
route.get("/reply/all/:commentId",auth(), commentController.getReplyCommentsController)
route.get("/reply/:replyCommentId", auth(), commentController.getSingleReplyCommentController)

export const commentRoutes = route
