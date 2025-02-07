"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl text-white font-bold mb-6">Event Management Platform</h1>
            <div className="space-x-4">
                <button 
                    onClick={() => router.push("/auth/login")}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Login
                </button>
                <button 
                    onClick={() => router.push("/auth/signup")}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Signup
                </button>
            </div>
        </div>
    );
}
