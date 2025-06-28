
import { Role } from "@prisma/client";
import { postController } from "./post.controller";
import auth from "../../middleware/auth";
import { Router } from "express";
import { fileUploader } from "../../helper/uploadFile";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";

const router = Router()

router.post("/create", auth(),fileUploader.uploadPostImage, parseBodyMiddleware, postController.createPostController)
router.put("/update/:postId", auth(),fileUploader.uploadPostImage,parseBodyMiddleware, postController.editPostController)
router.delete("/delete/:postId", auth(), postController.deletePostController)
router.get("/all", postController.getAllPostController)
router.get("/:postId", postController.getSinglePostController)
router.get("/user/:userId", postController.getSingleUserPostController)
router.post("/repost/:postId", auth(), postController.createRepostController)   

export const postRoutes = router        