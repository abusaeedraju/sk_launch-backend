import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { jobRoutes } from "../modules/job/job.routes";
import { postRoutes } from "../modules/post/post.route";
import { favoriteRoutes } from "../modules/favorite/favorite.route";
import { applicationRoutes } from "../modules/application/application.route";

const router = Router();
const routes = [
  {
    path: "/user",
    component: userRoutes,
  },
  {
    path: "/auth",
    component: authRoutes,
  },
  {
    path: "/job",
    component: jobRoutes,
  },
  {
    path: "/post",
    component: postRoutes,
  },
  {
    path: "/favorite",
    component: favoriteRoutes,
  },
  {
    path: "/application",
    component: applicationRoutes,
  },
  {
    path: "/experience",
    component: applicationRoutes,
  },
  {
    path: "/education",
    component: applicationRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.component));
export default router;
