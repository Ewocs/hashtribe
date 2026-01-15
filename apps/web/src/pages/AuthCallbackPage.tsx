import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

export function AuthCallbackPage() {
    const navigate = useNavigate();
    const { user, loading } = useAuthStore();

    useEffect(() => {
        if (!loading && user) {
            navigate('/tribes', { replace: true });
        } else if (!loading && !user) {
            navigate('/login', { replace: true });
        }
    }, [user, loading, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-950">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-dark-400">Completing authentication...</p>
            </div>
        </div>
    );
}
