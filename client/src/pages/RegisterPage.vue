
<template>
    <div class="auth-page">
        <div class="auth-card">
            <div class="auth-icon">🌷</div>

            <h1>Create an Account</h1>
            <p class="auth-description">
                Join our little community and share your stories.
            </p>

            <form @submit.prevent="register">
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
                    <label class="form-label">Username</label>
                    <input
                        v-model="username"
                        type="text"
                        class="form-control"
                        placeholder="Choose a username"
                        required
                    />
                </div>

                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        placeholder="Create a password"
                        required
                    />
                </div>

                <button type="submit" class="btn auth-btn w-100">
                    Register
                </button>
            </form>

            <p class="auth-message">{{ message }}</p>

            <div class="auth-footer">
                Already have an account?
                <router-link to="/login">Login here</router-link>
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
const username = ref("");
const password = ref("");
const message = ref("");

const register = async () => {
    try {
        await api.post("/users/register", {
            email: email.value,
            username: username.value,
            password: password.value
        });

        message.value = "Registration successful!";

        router.push("/login");
    } catch (error) {
        message.value =
            error.response?.data?.message || "Registration failed.";
    }
};
</script>
