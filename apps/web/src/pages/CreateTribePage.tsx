import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTribeStore } from '@/stores/tribeStore';

export function CreateTribePage() {
    const navigate = useNavigate();
    const { createTribe } = useTribeStore();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        visibility: 'public' as 'public' | 'private',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const tribe = await createTribe(formData);
            navigate(`/tribes/${tribe.slug}`);
        } catch (error) {
            console.error('Error creating tribe:', error);
            alert('Failed to create tribe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Create a Tribe</h1>
                <p className="text-dark-400">
                    Start a new community for developers to collaborate
                </p>
            </div>

            <form onSubmit={handleSubmit} className="card space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark-200 mb-2">
                        Tribe Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., React Developers"
                        className="input"
                        maxLength={50}
                    />
                    <p className="text-xs text-dark-500 mt-1">
                        Choose a clear, descriptive name for your tribe
                    </p>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-dark-200 mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="What is this tribe about?"
                        className="textarea"
                        rows={4}
                        maxLength={500}
                    />
                    <p className="text-xs text-dark-500 mt-1">
                        {formData.description.length}/500 characters
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-dark-200 mb-3">
                        Visibility *
                    </label>
                    <div className="space-y-3">
                        <label className="flex items-start space-x-3 cursor-pointer">
                            <input
                                type="radio"
                                name="visibility"
                                value="public"
                                checked={formData.visibility === 'public'}
                                onChange={(e) => setFormData({ ...formData, visibility: e.target.value as 'public' })}
                                className="mt-1"
                            />
                            <div>
                                <div className="font-medium text-white">Public</div>
                                <div className="text-sm text-dark-400">
                                    Anyone can discover and join this tribe
                                </div>
                            </div>
                        </label>
                        <label className="flex items-start space-x-3 cursor-pointer">
                            <input
                                type="radio"
                                name="visibility"
                                value="private"
                                checked={formData.visibility === 'private'}
                                onChange={(e) => setFormData({ ...formData, visibility: e.target.value as 'private' })}
                                className="mt-1"
                            />
                            <div>
                                <div className="font-medium text-white">Private</div>
                                <div className="text-sm text-dark-400">
                                    Only members can see and access this tribe
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/tribes')}
                        className="btn-secondary flex-1"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading || !formData.name}
                        className="btn-primary flex-1"
                    >
                        {loading ? 'Creating...' : 'Create Tribe'}
                    </button>
                </div>
            </form>
        </div>
    );
}
