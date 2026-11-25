<template>
    <div class="details-page">

            <!-- Reading Progress Bar -->
        <div class="reading-progress">
            <div
                class="reading-progress-bar"
                :style="{ width: readingProgress + '%' }"
            ></div>
        </div>

        <!-- Navigation -->
        <nav class="navbar blog-navbar">
            <div class="container">
                <router-link to="/" class="navbar-brand fw-bold">
                    My Blog <span>✿</span>
                </router-link>

                <router-link to="/" class="back-to-blog">
                    ← Back to Stories
                </router-link>
            </div>
        </nav>

        <main class="container details-main">
            <div v-if="loading" class="details-loading">
                Loading your story...
            </div>

            <div v-else-if="!post" class="details-empty">
                <span>🌷</span>
                <h2>Story not found</h2>
                <p>This story may have been removed or is unavailable.</p>
                <router-link to="/" class="details-back-btn">
                    Return to Blog
                </router-link>
            </div>

            <template v-else>
                <!-- Article -->
                <article class="details-card">
                    <div class="article-top">
                        <span class="post-tag">A STORY TO REMEMBER</span>
                        <span class="article-flower">✿</span>
                    </div>

                    <h1 class="details-title">
                        {{ post.title }}
                    </h1>

                    <div class="details-author">
                        <div class="author-icon">🌼</div>
                        <div>
                            <p class="author-name">
                                {{ post.author?.username || "Anonymous" }}
                            </p>
                            <p class="article-date">
                                Published on
                                {{ new Date(post.createdAt).toLocaleDateString("en-PH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                }) }}
                            </p>
                        </div>
                    </div>

                    <div class="article-divider"></div>

                    <div class="details-content">
                        {{ post.content }}
                    </div>

                    <div class="article-ending">
                        <span>✿</span>
                        <p>Thank you for taking the time to read.</p>
                        <span>✿</span>
                    </div>
                </article>

                <!-- Comments -->
                <section class="comments-card">
                    <div class="comments-heading">
                        <div>
                            <span class="comments-label">COMMUNITY</span>
                            <h2>Let's Talk About It 💬
                                <span class="comment-count">
                                    ({{ post.comments?.length || 0 }})
                                </span>
                            </h2>
                            <p>Every thought and perspective is welcome.</p>
                        </div>

                        <div class="comments-decoration">❀</div>
                    </div>

                    <div v-if="currentUser" class="comment-form">
                        <form @submit.prevent="addComment">
                            <label class="form-label">Share your thoughts</label>

                            <textarea
                                v-model="commentText"
                                class="form-control"
                                rows="4"
                                placeholder="Write something kind..."
                                required
                            ></textarea>

                            <button type="submit" class="btn publish-btn mt-3">
                                Post Comment →
                            </button>
                        </form>
                    </div>

                    <div v-else class="login-notice">
                        <p>
                            Want to join the conversation?
                            <router-link to="/login">Login</router-link>
                            to leave a comment.
                        </p>
                    </div>

                    <p v-if="message" class="auth-message">
                        {{ message }}
                    </p>

                    <div class="comments-list">
                        <div
                            v-if="!post.comments || post.comments.length === 0"
                            class="empty-comments"
                        >
                            <span>🌷</span>
                            <p>No comments yet.</p>
                            <small>Be the first to share your thoughts!</small>
                        </div>

                        <div
                            v-for="comment in post.comments"
                            :key="comment._id"
                            class="comment-item"
                        >
                            <div class="comment-avatar">🌿</div>

                            <div class="comment-body">
                                <strong>
                                    {{ comment.user?.username || "Anonymous" }}
                                </strong>

                                <p>{{ comment.text }}</p>

                                <small>
                                    {{ new Date(comment.createdAt).toLocaleString("en-PH") }}
                                </small>
                            </div>
                        </div>
                    </div>
                </section>
            </template>
        </main>

        <footer class="blog-footer">
            <p class="mb-0">Made with 💜 | My Blog © 2026</p>
        </footer>
    </div>
</template>



<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import api from "../api/axios";

const route = useRoute();

const post = ref(null);
const loading = ref(true);

const commentText = ref("");
const message = ref("");

const currentUser = JSON.parse(localStorage.getItem("user") || "null");

// Reading Progress
const readingProgress = ref(0);

const updateReadingProgress = () => {
    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    if (scrollableHeight <= 0) {
        readingProgress.value = 100;
        return;
    }

    readingProgress.value = Math.min(
        100,
        Math.max(0, (window.scrollY / scrollableHeight) * 100)
    );
};

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

    window.addEventListener("scroll", updateReadingProgress);
    updateReadingProgress();
});

onUnmounted(() => {
    window.removeEventListener("scroll", updateReadingProgress);
});
</script>

