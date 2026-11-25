<template>
    <div class="blog-page">
        
        <!-- Navigation Bar -->
        <nav class="navbar blog-navbar">
            <div class="container navbar-inner">

                <router-link class="navbar-brand blog-brand" to="/">
                    <span class="brand-icon">✿</span>
                    <span>My Blog</span>
                </router-link>

                <div class="navbar-actions">

                    <span v-if="currentUser" class="welcome-user">
                        Hello, {{ currentUser.username }}!
                    </span>

                    <button
                        v-if="currentUser"
                        class="btn logout-btn"
                        @click="logout"
                    >
                        Logout
                    </button>

                    <template v-else>
                        <router-link to="/login" class="nav-link login-link">
                            Login
                        </router-link>

                        <router-link to="/register" class="btn register-btn">
                            Join Us
                        </router-link>
                    </template>

                </div>
            </div>
        </nav>
        <!-- End of NavBar -->

        <!-- Main Content -->
        <main class="container blog-main">

            <!-- Hero Section -->
            <section class="hero-section mb-5">
                <div class="hero-decoration">✿</div>

                <p class="hero-label">A LITTLE SPACE FOR YOUR THOUGHTS</p>

                <h1>Stories Bloom Here.</h1>

                <p class="hero-description">
                    A cozy corner to share your stories, express your thoughts,
                    and discover something new.
                </p>

                <div class="hero-divider">
                    <span></span>
                    <span class="hero-flower">❀</span>
                    <span></span>
                </div>

                <p class="hero-note">Read • Write • Connect</p>
            </section>
            <!-- End of Hero Section -->

            
            <!-- Create Post Section -->
            <section v-if="currentUser" class="create-section mb-5">

                <div class="create-heading">
                    <div>
                        <p class="create-label">YOUR WRITING CORNER</p>
                        <h2>Share a New Story</h2>
                        <p class="section-description">
                            What's on your mind today?
                        </p>
                    </div>

                    <span class="create-icon">✎</span>
                </div>

                <form @submit.prevent="createPost">
                    <div class="mb-3">
                        <label class="form-label">Post Title</label>
                        <input
                            v-model="title"
                            type="text"
                            class="form-control"
                            placeholder="Give your story a lovely title..."
                            required
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Your Story</label>
                        <textarea
                            v-model="content"
                            class="form-control"
                            rows="5"
                            placeholder="Start writing your thoughts here..."
                            required
                        ></textarea>
                    </div>

                    <div class="create-footer">
                        <span class="writing-note">✿ Every story deserves to be shared.</span>

                        <button type="submit" class="btn publish-btn">
                            Publish Story →
                        </button>
                    </div>
                </form>

                <p class="form-message mt-3 mb-0">{{ message }}</p>
            </section>

            <div v-else class="login-notice mb-5">
                <span>✿</span>
                <p>Have a story to tell?</p>
                <small>Login to share your own stories with the community.</small>
                <router-link to="/login">Start Writing →</router-link>
            </div>
            <!-- End of Create Post -->
            
            <!-- Blog Posts -->
            <section class="stories-section">

                <div class="stories-heading">
                    <div>
                        <p class="stories-label">FROM OUR COMMUNITY</p>
                        <h2 class="section-title">Latest Stories</h2>
                        <p class="section-description">
                            Little thoughts, meaningful stories, and everything in between.
                        </p>
                    </div>

                    <span class="post-count">
                        {{ posts.length }} {{ posts.length === 1 ? 'Story' : 'Stories' }}
                    </span>
                </div>

                <div v-if="loading" class="text-center py-5">
                    <p class="loading-text">Gathering stories for you... ✿</p>
                </div>

                <div v-else-if="posts.length === 0" class="empty-state">
                    <span class="empty-flower">❀</span>
                    <h4>No stories have bloomed yet</h4>
                    <p>Be the first to share something with the community!</p>
                </div>

                <div v-else class="row g-4">
                    <div
                        v-for="post in posts"
                        :key="post._id"
                        class="col-md-6 col-lg-4"
                    >
                        <article class="card post-card h-100">
                            <div class="card-body d-flex flex-column">

                                <div class="post-card-top">
                                    <span class="post-tag">✿ BLOG STORY</span>
                                    <span class="post-flower">❀</span>
                                </div>

                                <h3 class="post-title">
                                    {{ post.title }}
                                </h3>

                                <p class="post-content">
                                    {{ post.content }}
                                </p>

                                <div class="post-card-bottom mt-auto">
                                    <div class="post-author">
                                        <span class="author-icon">✿</span>
                                        <span>By {{ post.author?.username }}</span>
                                    </div>

                                    <div class="post-actions">
                                        <router-link
                                            :to="`/posts/${post._id}`"
                                            class="btn read-btn"
                                        >
                                            Read Story →
                                        </router-link>

                                        <button
                                            v-if="isAuthor(post)"
                                            class="btn edit-btn"
                                            @click="editPost(post)"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            v-if="canDelete(post)"
                                            class="btn delete-btn"
                                            @click="deletePost(post._id)"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <!-- End of Blog Posts -->


            
        <!-- Edit Post Section -->
        <section v-if="editing" class="create-section edit-section mt-5">

            <div class="create-heading">
                <div>
                    <p class="create-label">MAKE SOME CHANGES</p>
                    <h2>Edit Your Story</h2>
                    <p class="section-description">
                        Update your thoughts and make your story even better.
                    </p>
                </div>

                <span class="create-icon edit-icon">✎</span>
            </div>

            <form @submit.prevent="updatePost">

                <div class="mb-3">
                    <label class="form-label">Post Title</label>
                    <input
                        v-model="title"
                        type="text"
                        class="form-control"
                        placeholder="Enter your post title..."
                        required
                    />
                </div>

                <div class="mb-3">
                    <label class="form-label">Your Story</label>
                    <textarea
                        v-model="content"
                        class="form-control"
                        rows="5"
                        placeholder="Edit your story here..."
                        required
                    ></textarea>
                </div>

                <div class="edit-footer">
                    <button type="button" class="btn cancel-btn" @click="cancelEdit">
                        Cancel
                    </button>

                    <button type="submit" class="btn publish-btn">
                        Save Changes →
                    </button>
                </div>
            </form>
        </section>
        <!-- End of Edit Post -->

        </main>
        <!-- End of Main Content -->

        <!-- Footer -->
        <footer class="blog-footer text-center">
            <p class="mb-0">Made with 🪷 | My Blog © 2026</p>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../api/axios";

const router = useRouter();

const posts = ref([]);
const loading = ref(true);

const title = ref("");
const content = ref("");
const message = ref("");

const editing = ref(false);
const editingId = ref(null);

const currentUser = JSON.parse(localStorage.getItem("user") || "null");

const getPosts = async () => {
    try {
        const response = await api.get("/posts");
        posts.value = response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
    } finally {
        loading.value = false;
    }
};

const createPost = async () => {
    try {
        await api.post("/posts", {
            title: title.value,
            content: content.value
        });

        title.value = "";
        content.value = "";
        message.value = "Post created successfully!";

        getPosts();
    } catch (error) {
        message.value =
            error.response?.data?.message || "Failed to create post.";
    }
};

const editPost = (post) => {
    editing.value = true;
    editingId.value = post._id;
    title.value = post.title;
    content.value = post.content;

    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
};

const updatePost = async () => {
    try {
        await api.put(`/posts/${editingId.value}`, {
            title: title.value,
            content: content.value
        });

        editing.value = false;
        editingId.value = null;
        title.value = "";
        content.value = "";
        message.value = "Post updated successfully!";

        getPosts();
    } catch (error) {
        message.value =
            error.response?.data?.message || "Failed to update post.";
    }
};

const cancelEdit = () => {
    editing.value = false;
    editingId.value = null;
    title.value = "";
    content.value = "";
};

const deletePost = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) {
        return;
    }

    try {
        await api.delete(`/posts/${id}`);
        message.value = "Post deleted successfully!";
        getPosts();
    } catch (error) {
        message.value =
            error.response?.data?.message || "Failed to delete post.";
    }
};

const isAuthor = (post) => {
    return post.author?._id === currentUser?.id;
};

const canDelete = (post) => {
    return isAuthor(post) || currentUser?.role === "admin";
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
};

onMounted(() => {
    getPosts();
});
</script>
