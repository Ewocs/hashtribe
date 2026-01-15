-- =============================================
-- SEED DATA FOR DEVELOPMENT
-- =============================================

-- Note: This seed assumes you have at least one user authenticated via GitHub OAuth
-- The user_id below should be replaced with actual auth.users.id after first login

-- Insert sample users (you'll need to replace these IDs with real ones from auth.users)
-- For now, we'll create placeholder data that can be updated after first GitHub login

-- Sample Tribes
INSERT INTO public.tribes (name, slug, description, visibility, created_by) VALUES
  ('React Developers', 'react-developers-abc123', 'A community for React enthusiasts and professionals', 'public', (SELECT id FROM auth.users LIMIT 1)),
  ('TypeScript Masters', 'typescript-masters-def456', 'Deep dive into TypeScript best practices', 'public', (SELECT id FROM auth.users LIMIT 1)),
  ('Open Source Contributors', 'open-source-contributors-ghi789', 'Collaborate on open source projects', 'public', (SELECT id FROM auth.users LIMIT 1)),
  ('Web3 Builders', 'web3-builders-jkl012', 'Building the decentralized future', 'private', (SELECT id FROM auth.users LIMIT 1)),
  ('DevOps Engineers', 'devops-engineers-mno345', 'Infrastructure, CI/CD, and cloud technologies', 'public', (SELECT id FROM auth.users LIMIT 1))
ON CONFLICT (slug) DO NOTHING;

-- Sample Topics (will be created after tribes exist)
INSERT INTO public.topics (tribe_id, title, content, created_by) VALUES
  (
    (SELECT id FROM public.tribes WHERE slug = 'react-developers-abc123'),
    'Best practices for React 19',
    'What are your thoughts on the new React 19 features? Let''s discuss the compiler and server components.',
    (SELECT id FROM auth.users LIMIT 1)
  ),
  (
    (SELECT id FROM public.tribes WHERE slug = 'typescript-masters-def456'),
    'Generic constraints in TypeScript 5.3',
    'How do you handle complex generic constraints? Share your patterns and solutions.',
    (SELECT id FROM auth.users LIMIT 1)
  ),
  (
    (SELECT id FROM public.tribes WHERE slug = 'open-source-contributors-ghi789'),
    'Looking for contributors: Modern Icon Pack',
    'We''re building a comprehensive icon library. Need help with SVG optimization and React component generation.',
    (SELECT id FROM auth.users LIMIT 1)
  )
ON CONFLICT DO NOTHING;

-- Sample Competitions
INSERT INTO public.competitions (title, slug, description, difficulty, status, start_time, end_time, created_by) VALUES
  (
    'Weekly Algorithm Challenge #1',
    'weekly-algo-challenge-1-abc123',
    'Solve 3 algorithm problems in 2 hours. Topics: Arrays, Strings, Dynamic Programming',
    'medium',
    'upcoming',
    NOW() + INTERVAL '2 days',
    NOW() + INTERVAL '2 days 2 hours',
    (SELECT id FROM auth.users LIMIT 1)
  ),
  (
    'React Component Design Contest',
    'react-component-design-xyz789',
    'Build the most reusable and elegant React component. Judged on code quality, accessibility, and design.',
    'hard',
    'upcoming',
    NOW() + INTERVAL '5 days',
    NOW() + INTERVAL '7 days',
    (SELECT id FROM auth.users LIMIT 1)
  ),
  (
    'Beginner Friendly: First Contribution',
    'beginner-first-contribution-def456',
    'Perfect for newcomers! Complete simple coding tasks and learn Git workflow.',
    'easy',
    'live',
    NOW() - INTERVAL '1 day',
    NOW() + INTERVAL '6 days',
    (SELECT id FROM auth.users LIMIT 1)
  )
ON CONFLICT (slug) DO NOTHING;

-- Note: Tribe members are auto-created via trigger for tribe creators
-- Additional members can be added after user authentication
