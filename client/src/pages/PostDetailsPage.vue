
<template>
    <div class="details-page">
        <nav class="navbar blog-navbar">
            <div class="container">
                <router-link to="/" class="navbar-brand fw-bold">
                    My Blog 🌼
                </router-link>

                <router-link to="/" class="btn btn-light btn-sm">
                    ← Back to Blog
                </router-link>
            </div>
        </nav>

        <div class="container py-5">
            <div v-if="loading" class="text-center">
                Loading post...
            </div>

            <div v-else-if="!post" class="empty-state">
                Post not found.
            </div>

            <template v-else>
                <!-- Post Content -->
                <article class="details-card mb-4">
                    <span class="post-tag">BLOG POST</span>

                    <h1 class="details-title mt-3">
                        {{ post.title }}
                    </h1>

                    <div class="details-author">
                        Written by {{ post.author?.username }}
                    </div>

                    <hr />

                    <p class="details-content">
                        {{ post.content }}
                    </p>

                    <div class="details-date">
                        <span>Published on </span>
                        <strong>
                            {{ new Date(post.createdAt).toLocaleString("en-PH", {
                                dateStyle: "long",
                                timeStyle: "short"
                            }) }}
                        </strong>
                    </div>
                </article>

                <!-- Comments -->
                <section class="comments-card">
                    <h2>Comments 💬</h2>

                    <p class="section-description">
                        Join the conversation.
                    </p>

                    <div v-if="currentUser" class="mb-4">
                        <form @submit.prevent="addComment">
                            <textarea
                                v-model="commentText"
                                class="form-control"
                                rows="3"
                                placeholder="Write a comment..."
                                required
                            ></textarea>

                            <button type="submit" class="btn publish-btn mt-3">
                                Add Comment
                            </button>
                        </form>
                    </div>

                    <div v-else class="login-notice mb-4">
                        <router-link to="/login">Login</router-link>
                        to leave a comment.
                    </div>

                    <p class="auth-message">{{ message }}</p>

                    <div
                        v-if="!post.comments || post.comments.length === 0"
                        class="empty-comments"
                    >
                        No comments yet. Be the first to comment! 🌷
                    </div>

                    <div
                        v-for="comment in post.comments"
                        :key="comment._id"
                        class="comment-item"
                    >
                        <strong>{{ comment.user?.username }}</strong>
                        <p class="mb-1">{{ comment.text }}</p>
                        <small class="text-muted">
                            {{ new Date(comment.createdAt).toLocaleString() }}
                        </small>
                    </div>
                </section>
            </template>
        </div>

        <footer class="blog-footer text-center">
            <p class="mb-0">Made with 💜 | My Blog © 2026</p>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../api/axios";

const route = useRoute();

const post = ref(null);
const loading = ref(true);

const commentText = ref("");
const message = ref("");

const currentUser = JSON.parse(localStorage.getItem("user") || "null");

const getPost = async () => {
    try {
        const response = await api.get(`/posts/${route.params.id}`);
        post.value = response.data;
    } catch (error) {
        console.error("Error fetching post:", error);
    } finally {
        loading.value = false;
    }
};

const addComment = async () => {
    try {
        await api.post(`/posts/${route.params.id}/comments`, {
            text: commentText.value
        });

        commentText.value = "";
        message.value = "Comment added successfully!";

        await getPost();
    } catch (error) {
        message.value =
            error.response?.data?.message || "Failed to add comment.";
    }
};

onMounted(() => {
    getPost();
});
</script>
