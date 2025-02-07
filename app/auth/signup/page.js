"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make API call to create the user
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await response.json();

        if (response.ok) {
            // Store the JWT token in localStorage
            localStorage.setItem("token", data.token);
            router.push("/events"); // Redirect to events page after signup
        } else {
            // Show the error message
            setError(data.message || "Signup failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl text-white font-bold mb-6">Signup</h1>
            {error && <p className="text-red-500">{error}</p>}  {/* Display error messages */}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Full Name" 
                    className="w-full mb-4 p-2 border rounded-lg" 
                    onChange={handleChange} 
                    required 
                />
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
                <button 
                    type="submit" 
                    className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                >
                    Signup
                </button>
            </form>
            <p className="mt-4 text-white">
                Already have an account? 
                <span 
                    className="text-green-500 cursor-pointer"
                    onClick={() => router.push("/auth/login")}
                > Login</span>
            </p>
        </div>
    );
}
