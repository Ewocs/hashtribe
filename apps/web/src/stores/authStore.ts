import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { UserProfile } from '@hashtribe/shared/types';

interface AuthState {
    user: User | null;
    profile: UserProfile | null;
    session: Session | null;
    loading: boolean;
    initialized: boolean;

    // Actions
    initialize: () => Promise<void>;
    signInWithGitHub: () => Promise<void>;
    signOut: () => Promise<void>;
    updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    profile: null,
    session: null,
    loading: true,
    initialized: false,

    initialize: async () => {
        try {
            // Get initial session
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                // Fetch user profile
                const { data: profile } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                set({
                    user: session.user,
                    session,
                    profile: profile || null,
                    loading: false,
                    initialized: true,
                });
            } else {
                set({ loading: false, initialized: true });
            }

            // Listen for auth changes
            supabase.auth.onAuthStateChange(async (event, session) => {
                console.log('Auth state changed:', event);

                if (session?.user) {
                    // Fetch or create user profile
                    let { data: profile } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    // If profile doesn't exist, create it from GitHub data
                    if (!profile && event === 'SIGNED_IN') {
                        const githubData = session.user.user_metadata;

                        const { data: newProfile, error } = await supabase
                            .from('users')
                            .insert({
                                id: session.user.id,
                                username: githubData.user_name || githubData.preferred_username,
                                display_name: githubData.full_name || githubData.name,
                                avatar_url: githubData.avatar_url,
                                github_username: githubData.user_name || githubData.preferred_username,
                                github_id: githubData.provider_id,
                                bio: githubData.bio || null,
                            })
                            .select()
                            .single();

                        if (!error) {
                            profile = newProfile;
                        }
                    }

                    set({
                        user: session.user,
                        session,
                        profile: profile || null,
                        loading: false,
                    });
                } else {
                    set({
                        user: null,
                        session: null,
                        profile: null,
                        loading: false,
                    });
                }
            });
        } catch (error) {
            console.error('Error initializing auth:', error);
            set({ loading: false, initialized: true });
        }
    },

    signInWithGitHub: async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
                scopes: 'read:user user:email',
            },
        });

        if (error) {
            console.error('Error signing in with GitHub:', error);
            throw error;
        }
    },

    signOut: async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Error signing out:', error);
            throw error;
        }

        set({
            user: null,
            session: null,
            profile: null,
        });
    },

    updateProfile: async (updates) => {
        const { profile } = get();
        if (!profile) return;

        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', profile.id)
            .select()
            .single();

        if (error) {
            console.error('Error updating profile:', error);
            throw error;
        }

        set({ profile: data });
    },
}));
