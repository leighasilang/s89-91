
<template>
    <div class="auth-page">
        <div class="auth-card">
            <div class="auth-icon">🌼</div>

            <h1>Welcome Back!</h1>
            <p class="auth-description">
                Login to continue sharing your stories.
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

                <div class="mb-3">
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
                    Login
                </button>
            </form>

            <p class="auth-message">{{ message }}</p>

            <div class="auth-footer">
                Don't have an account?
                <router-link to="/register">Register here</router-link>
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
