import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const isGuest = localStorage.getItem('isGuest') === "true";
        if (!userId && !isGuest) {
            router.push('/auth/login');
        }
    }, [router]);
};

export default useAuth;