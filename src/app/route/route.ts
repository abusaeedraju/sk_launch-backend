import { Router } from "express"
import { userRoutes } from "../modules/user/user.routes"
import { authRoutes } from "../modules/auth/auth.routes"
import { jobRoutes } from "../modules/job/job.routes"
import { postRoutes } from "../modules/post/post.route"
import { favoriteRoutes } from "../modules/favorite/favorite.route"
import { applicationRoutes } from "../modules/application/application.route"
import { commentRoutes } from "../modules/comment/comment.route"
import { experienceRoutes } from "../modules/experience/experience.Routes"
import { educationRoutes } from "../modules/education/education.Routes"
import { likeRoutes } from "../modules/like/like.route"
import { NotificationsRouters } from "../modules/notifications/notification.routes"
import { ChatRouters } from "../modules/chat/chat.Routes"

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
        path: "/experience",
        component: experienceRoutes
    },
    {
        path: "/education",
        component: educationRoutes
    },
    {
        path: "/like",
        component: likeRoutes
    },
    {
        path: "/notification",
        component: NotificationsRouters
    },
    {
        path:"/chats",
        component: ChatRouters
    }
]

routes.forEach(route => router.use(route.path, route.component))
export default router 