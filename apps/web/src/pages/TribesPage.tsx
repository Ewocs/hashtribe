import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTribeStore } from '@/stores/tribeStore';
import { useAuthStore } from '@/stores/authStore';
import { formatRelativeTime } from '@hashtribe/shared/utils';
import clsx from 'clsx';

export function TribesPage() {
    const { tribes, loading, fetchTribes, joinTribe, leaveTribe } = useTribeStore();
    const { user, profile } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [visibilityFilter, setVisibilityFilter] = useState<'all' | 'public' | 'private'>('all');

    useEffect(() => {
        fetchTribes(user?.id);
    }, [user?.id]);

    const filteredTribes = tribes.filter(tribe => {
        const matchesSearch = tribe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tribe.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesVisibility = visibilityFilter === 'all' || tribe.visibility === visibilityFilter;
        return matchesSearch && matchesVisibility;
    });

    const handleJoinLeave = async (tribeId: string, isMember: boolean) => {
        if (!user) return;

        try {
            if (isMember) {
                await leaveTribe(tribeId, user.id);
            } else {
                await joinTribe(tribeId, user.id);
            }
        } catch (error) {
            console.error('Error joining/leaving tribe:', error);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Tribes</h1>
                    <p className="text-dark-400">
                        Discover and join developer communities
                    </p>
                </div>
                <Link to="/tribes/create" className="btn-primary">
                    Create Tribe
                </Link>
            </div>

            {/* Filters */}
            <div className="card">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search tribes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setVisibilityFilter('all')}
                            className={clsx(
                                'px-4 py-2 rounded-lg font-medium transition-colors',
                                visibilityFilter === 'all'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                            )}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setVisibilityFilter('public')}
                            className={clsx(
                                'px-4 py-2 rounded-lg font-medium transition-colors',
                                visibilityFilter === 'public'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                            )}
                        >
                            Public
                        </button>
                        <button
                            onClick={() => setVisibilityFilter('private')}
                            className={clsx(
                                'px-4 py-2 rounded-lg font-medium transition-colors',
                                visibilityFilter === 'private'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                            )}
                        >
                            Private
                        </button>
                    </div>
                </div>
            </div>

            {/* Tribes Grid */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-dark-400">Loading tribes...</p>
                </div>
            ) : filteredTribes.length === 0 ? (
                <div className="card text-center py-12">
                    <p className="text-dark-400 text-lg">No tribes found</p>
                    <p className="text-dark-500 mt-2">Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTribes.map((tribe) => (
                        <div key={tribe.id} className="card-hover">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <Link
                                        to={`/tribes/${tribe.slug}`}
                                        className="text-xl font-bold text-white hover:text-primary-400 transition-colors"
                                    >
                                        {tribe.name}
                                    </Link>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={clsx(
                                            'badge',
                                            tribe.visibility === 'public' ? 'badge-success' : 'badge-warning'
                                        )}>
                                            {tribe.visibility}
                                        </span>
                                        {tribe.is_member && (
                                            <span className="badge badge-primary">
                                                {tribe.user_role === 'admin' ? 'Admin' : 'Member'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <p className="text-dark-300 text-sm mb-4 line-clamp-2">
                                {tribe.description || 'No description provided'}
                            </p>

                            <div className="flex items-center justify-between text-sm text-dark-400 mb-4">
                                <span>{tribe.member_count || 0} members</span>
                                <span>{formatRelativeTime(tribe.created_at)}</span>
                            </div>

                            <div className="flex gap-2">
                                <Link
                                    to={`/tribes/${tribe.slug}`}
                                    className="btn-secondary flex-1 text-center"
                                >
                                    View
                                </Link>
                                {tribe.visibility === 'public' && (
                                    <button
                                        onClick={() => handleJoinLeave(tribe.id, tribe.is_member)}
                                        className={clsx(
                                            'btn flex-1',
                                            tribe.is_member ? 'btn-ghost' : 'btn-primary'
                                        )}
                                    >
                                        {tribe.is_member ? 'Leave' : 'Join'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
