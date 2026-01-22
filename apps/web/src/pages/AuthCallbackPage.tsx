import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

export function AuthCallbackPage() {
    const navigate = useNavigate();
    const { user, loading } = useAuthStore();

    useEffect(() => {
        if (loading) return;

        if (user) {
            navigate('/feed', { replace: true });
        } else {
            // Check if we are potentially in the middle of an auth flow
            const hasAuthParams = window.location.hash.includes('access_token') ||
                window.location.hash.includes('type=recovery') ||
                window.location.search.includes('code');

            // Only redirect to login if we don't have auth params
            // If we DO have auth params, we wait for Supabase to handle them (which will update the store)
            if (!hasAuthParams) {
                navigate('/login', { replace: true });
            }
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
