/**
 * Generate a URL-friendly slug from a string
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Generate a unique slug by appending a random suffix
 */
export function generateUniqueSlug(text: string): string {
    const baseSlug = slugify(text);
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    return `${baseSlug}-${randomSuffix}`;
}

/**
 * Format a date to a relative time string (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
    const now = new Date();
    const then = new Date(date);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}

/**
 * Truncate text to a maximum length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}

/**
 * Validate username format (alphanumeric, hyphens, underscores, 3-20 chars)
 */
export function isValidUsername(username: string): boolean {
    return /^[a-zA-Z0-9_-]{3,20}$/.test(username);
}

/**
 * Calculate DevCom score based on various factors
 * This is a simplified version - will be enhanced in Phase 2
 */
export function calculateDevComScore(params: {
    githubContributions: number;
    competitionScore: number;
    communityReputation: number;
}): number {
    const { githubContributions, competitionScore, communityReputation } = params;

    // Weighted scoring (Phase 1 simplified version)
    const githubWeight = 0.4;
    const competitionWeight = 0.4;
    const communityWeight = 0.2;

    const normalizedGithub = Math.min(githubContributions / 1000, 1) * 100;
    const normalizedCompetition = Math.min(competitionScore / 1000, 1) * 100;
    const normalizedCommunity = Math.min(communityReputation / 100, 1) * 100;

    return Math.round(
        normalizedGithub * githubWeight +
        normalizedCompetition * competitionWeight +
        normalizedCommunity * communityWeight
    );
}

/**
 * Format large numbers with K, M suffixes
 */
export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}
