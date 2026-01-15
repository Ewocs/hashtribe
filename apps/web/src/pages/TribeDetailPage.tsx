import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTribeStore } from '@/stores/tribeStore';
import { useAuthStore } from '@/stores/authStore';
import { formatRelativeTime } from '@hashtribe/shared/utils';
import clsx from 'clsx';

export function TribeDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const { currentTribe, members, loading, fetchTribeBySlug, joinTribe, leaveTribe } = useTribeStore();
    const { user } = useAuthStore();

    useEffect(() => {
        if (slug) {
            fetchTribeBySlug(slug, user?.id);
        }
    }, [slug, user?.id]);

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-dark-400">Loading tribe...</p>
            </div>
        );
    }

    if (!currentTribe) {
        return (
            <div className="card text-center py-12">
                <h2 className="text-2xl font-bold text-white mb-2">Tribe not found</h2>
                <p className="text-dark-400 mb-6">This tribe doesn't exist or you don't have access to it</p>
                <Link to="/tribes" className="btn-primary">
                    Browse Tribes
                </Link>
            </div>
        );
    }

    const userMembership = members.find(m => m.user_id === user?.id);
    const isMember = !!userMembership;
    const isAdmin = userMembership?.role === 'admin';

    const handleJoinLeave = async () => {
        if (!user) return;

        try {
            if (isMember) {
                await leaveTribe(currentTribe.id, user.id);
            } else {
                await joinTribe(currentTribe.id, user.id);
            }
        } catch (error) {
            console.error('Error joining/leaving tribe:', error);
        }
    };

    return (
        <div className="space-y-8">
            {/* Tribe Header */}
            <div className="card">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <h1 className="text-4xl font-bold text-white">{currentTribe.name}</h1>
                            <span className={clsx(
                                'badge',
                                currentTribe.visibility === 'public' ? 'badge-success' : 'badge-warning'
                            )}>
                                {currentTribe.visibility}
                            </span>
                        </div>
                        <p className="text-dark-300 text-lg mb-4">
                            {currentTribe.description || 'No description provided'}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-dark-400">
                            <span>{members.length} members</span>
                            <span>Created {formatRelativeTime(currentTribe.created_at)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {currentTribe.visibility === 'public' && (
                            <button
                                onClick={handleJoinLeave}
                                className={clsx(
                                    'btn',
                                    isMember ? 'btn-ghost' : 'btn-primary'
                                )}
                            >
                                {isMember ? 'Leave Tribe' : 'Join Tribe'}
                            </button>
                        )}
                        {isAdmin && (
                            <Link to={`/tribes/${slug}/settings`} className="btn-secondary">
                                Settings
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Members Section */}
            <div className="card">
                <h2 className="text-2xl font-bold text-white mb-6">
                    Members ({members.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {members.map((member: any) => (
                        <div
                            key={member.id}
                            className="flex items-center gap-3 p-3 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors"
                        >
                            <img
                                src={member.users?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.users?.username}`}
                                alt={member.users?.username}
                                className="w-10 h-10 rounded-full border-2 border-dark-600"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <Link
                                        to={`/profile/${member.users?.username}`}
                                        className="font-medium text-white hover:text-primary-400 transition-colors truncate"
                                    >
                                        {member.users?.display_name || member.users?.username}
                                    </Link>
                                    {member.role === 'admin' && (
                                        <span className="badge badge-primary text-xs">Admin</span>
                                    )}
                                </div>
                                <p className="text-xs text-dark-400">@{member.users?.username}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Topics Section (Placeholder for Phase 1) */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Topics</h2>
                    {isMember && (
                        <button className="btn-primary" disabled>
                            Create Topic (Coming Soon)
                        </button>
                    )}
                </div>
                <div className="text-center py-12 bg-dark-800 rounded-lg">
                    <p className="text-dark-400">Topics feature coming soon!</p>
                    <p className="text-dark-500 text-sm mt-2">
                        Members will be able to create and discuss topics here
                    </p>
                </div>
            </div>
        </div>
    );
}
