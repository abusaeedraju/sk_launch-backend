import { Router } from "express"
import { userRoutes } from "../modules/user/user.routes"
import { authRoutes } from "../modules/auth/auth.routes"
import { jobRoutes } from "../modules/job/job.routes"
import { postRoutes } from "../modules/post/post.route"
import { favoriteRoutes } from "../modules/favorite/favorite.route"
import { applicationRoutes } from "../modules/application/application.route"
import { commentRoutes } from "../modules/comment/comment.route"
import { likeRoutes } from "../modules/like/like.route"

const router = Router()
const routes = [
    {
        path: "/user",
        component: userRoutes
    },
    {
        path: "/auth",
        component: authRoutes
    },
    {
        path: "/job",
        component: jobRoutes
    },
    {
        path: "/post",
        component: postRoutes
    },
    {
        path: "/favorite",
        component: favoriteRoutes
    },
    {
        path: "/application",
        component: applicationRoutes
    },
    {
        path: "/comment",
        component: commentRoutes
    },
    {
        path: "/like",
        component: likeRoutes
    }
]

routes.forEach(route => router.use(route.path, route.component))
export default router 