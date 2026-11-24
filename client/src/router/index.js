import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import BlogPage from "../pages/BlogPage.vue";
import PostDetailsPage from "../pages/PostDetailsPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "blog",
            component: BlogPage
        },
        {
            path: "/login",
            name: "login",
            component: LoginPage
        },
        {
            path: "/register",
            name: "register",
            component: RegisterPage
        },
        {
            path: "/posts/:id",
            name: "post-details",
            component: PostDetailsPage
        }
    ]
});

export default router;