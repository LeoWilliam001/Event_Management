"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.error || "Something went wrong!");
                return;
            }

            // Check if response body is empty before parsing
            const data = response.status === 204 ? {} : await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token); // Store JWT
                localStorage.setItem("user", JSON.stringify(data.user)); // Store user details
                localStorage.setItem("userId", data.user._id); // Store userId
                localStorage.removeItem("isGuest"); // Remove guest flag if present
                router.push("/events"); // Redirect to events page
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const handleGuestLogin = () => {
        localStorage.setItem("isGuest", "true"); // Set guest flag
        router.push("/events");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-white">Login</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full mb-4 p-2 border rounded-lg"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full mb-4 p-2 border rounded-lg"
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                    Login
                </button>
            </form>

            <p className="mt-4 text-white">
                Don't have an account?{" "}
                <span className="text-cyan-500 cursor-pointer" onClick={() => router.push("/auth/signup")}>
                    Signup
                </span>
            </p>

            <button
                onClick={handleGuestLogin}
                className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
                Continue as Guest
            </button>
        </div>
    );
}