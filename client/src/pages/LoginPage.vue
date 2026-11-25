<template>
    <div class="auth-page">
        <div class="auth-card">

            <router-link to="/" class="auth-brand">
                <span>✿</span> My Blog
            </router-link>

            <div class="auth-decoration">❀</div>

            <div class="auth-icon">🌼</div>

            <p class="auth-label">WELCOME BACK</p>

            <h1>It's lovely to see you.</h1>

            <p class="auth-description">
                Login to continue sharing your stories and discovering new ones.
            </p>

            <form @submit.prevent="login">

                <div class="mb-3">
                    <label class="form-label">Email Address</label>
                    <input
                        v-model="email"
                        type="email"
                        class="form-control"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div class="mb-4">
                    <label class="form-label">Password</label>
                    <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button type="submit" class="btn auth-btn w-100">
                    Login to Your Account →
                </button>

            </form>

            <p v-if="message" class="auth-message">
                {{ message }}
            </p>

            <div class="auth-footer">
                Don't have an account?
                <router-link to="/register">Join our community</router-link>
            </div>

            <router-link to="/" class="back-link">
                ← Back to Blog
            </router-link>

        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api/axios";

const router = useRouter();

const email = ref("");
const password = ref("");
const message = ref("");

const login = async () => {
    try {
        const response = await api.post("/users/login", {
            email: email.value,
            password: password.value
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        router.push("/");
    } catch (error) {
        message.value =
            error.response?.data?.message || "Login failed.";
    }
};
</script>
