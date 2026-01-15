# HashTribe - GitHub Issues Template

This document provides templates for creating GitHub issues for the HashTribe project. These are designed for ECWoC contributors and open-source developers.

---

## 🐛 Bug Report Template

```markdown
## Bug Description
A clear and concise description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Screenshots
If applicable, add screenshots to help explain your problem.

## Environment
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome, Firefox, Safari]
- Node version: [e.g., 18.19.0]
- pnpm version: [e.g., 8.15.0]

## Additional Context
Add any other context about the problem here.

## Labels
- `bug`
- `frontend` or `backend` or `rls`
```

---

## ✨ Feature Request Template

```markdown
## Feature Description
A clear and concise description of the feature you'd like to see.

## Problem Statement
What problem does this feature solve? Why is it needed?

## Proposed Solution
Describe how you envision this feature working.

## Alternatives Considered
Have you considered any alternative solutions or features?

## Implementation Ideas
If you have ideas on how to implement this, share them here.

## Phase
Which phase does this belong to?
- [ ] Phase 1 - MVP
- [ ] Phase 2 - Growth
- [ ] Phase 3 - Scale

## Labels
- `enhancement`
- `frontend` or `backend` or `rls`
```

---

## 📝 Good First Issue Template

```markdown
## Task Description
A clear description of what needs to be done.

## Context
Why is this task needed? What's the background?

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Details
- Files to modify: `path/to/file.tsx`
- Related components: `ComponentName`
- Database tables (if applicable): `table_name`

## Steps to Complete
1. Step 1
2. Step 2
3. Step 3

## Resources
- [Link to documentation]
- [Link to related issue]
- [Link to design mockup]

## Labels
- `good-first-issue`
- `frontend` or `backend` or `rls`

## Estimated Difficulty
- [ ] Easy (1-2 hours)
- [ ] Medium (2-4 hours)
- [ ] Hard (4+ hours)
```

---

## 🔒 RLS Policy Issue Template

```markdown
## Policy Description
Describe the Row Level Security policy that needs to be created or modified.

## Table
Which table does this policy apply to?

## Operation
- [ ] SELECT
- [ ] INSERT
- [ ] UPDATE
- [ ] DELETE

## Policy Logic
Describe the access control logic:
- Who should have access?
- Under what conditions?
- What role requirements?

## SQL Draft
```sql
CREATE POLICY "policy_name"
  ON table_name FOR operation
  USING (condition);
```

## Test Cases
How can we verify this policy works correctly?
1. Test case 1
2. Test case 2

## Labels
- `rls`
- `backend`
- `security`
```

---

## 🎨 UI/UX Issue Template

```markdown
## Component/Page
Which component or page needs UI/UX work?

## Current State
Describe or show the current UI.

## Desired State
Describe or show the desired UI.

## Design Mockup
[Attach image or link to Figma/design tool]

## Accessibility Considerations
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Color contrast
- [ ] Mobile responsive

## Implementation Notes
- Components to create/modify
- Tailwind classes to use
- Animations/transitions needed

## Labels
- `frontend`
- `ui/ux`
- `enhancement`
```

---

## 📚 Documentation Issue Template

```markdown
## Documentation Type
- [ ] README update
- [ ] API documentation
- [ ] Code comments
- [ ] Architecture docs
- [ ] Contributing guide
- [ ] Tutorial/Guide

## What Needs Documentation?
Describe what needs to be documented.

## Why Is This Needed?
Why is this documentation important?

## Suggested Content
Outline or draft of the documentation content.

## Files to Update
- `path/to/file.md`

## Labels
- `documentation`
```

---

## 🔧 Refactoring Issue Template

```markdown
## Code to Refactor
Which code needs refactoring?

## Current Issues
What problems exist with the current code?
- [ ] Code duplication
- [ ] Poor performance
- [ ] Hard to maintain
- [ ] Lacks type safety
- [ ] Other: ___

## Proposed Refactoring
How should the code be refactored?

## Benefits
What benefits will this refactoring provide?

## Breaking Changes
Will this introduce any breaking changes?
- [ ] Yes (describe below)
- [ ] No

## Labels
- `refactor`
- `frontend` or `backend`
```

---

## 🧪 Testing Issue Template

```markdown
## Test Type
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] RLS policy tests

## What Needs Testing?
Describe what functionality needs test coverage.

## Current Coverage
What's the current test coverage (if any)?

## Test Cases
List the test cases to implement:
1. Test case 1
2. Test case 2
3. Test case 3

## Testing Framework
Which framework should be used?
- [ ] Vitest
- [ ] Jest
- [ ] Playwright
- [ ] Other: ___

## Labels
- `testing`
- `frontend` or `backend`
```

---

## 🚀 Deployment Issue Template

```markdown
## Deployment Task
What needs to be deployed or configured?

## Environment
- [ ] Development
- [ ] Staging
- [ ] Production

## Steps Required
1. Step 1
2. Step 2
3. Step 3

## Configuration Needed
- Environment variables
- Secrets
- DNS settings
- Other: ___

## Verification
How to verify the deployment was successful?

## Rollback Plan
What's the rollback plan if something goes wrong?

## Labels
- `deployment`
- `devops`
```

---

## Sample Issues for Phase 1 MVP

### Issue 1: Implement Topic Creation
```markdown
Title: Implement Topic Creation in Tribes

## Feature Description
Allow tribe members to create discussion topics within their tribes.

## Acceptance Criteria
- [ ] Create topic form with title and content fields
- [ ] Validate user is a tribe member
- [ ] Insert topic into database
- [ ] Redirect to topic detail page
- [ ] Show success notification

## Technical Details
- Create `CreateTopicPage.tsx`
- Add route `/tribes/:slug/topics/create`
- Use `topicStore.ts` for state management
- RLS policy already exists

## Labels
- `enhancement`
- `frontend`
- `good-first-issue`
```

### Issue 2: Add Upvoting System
```markdown
Title: Implement Upvoting for Topics

## Feature Description
Allow users to upvote topics to show appreciation or agreement.

## Acceptance Criteria
- [ ] Create `topic_upvotes` table
- [ ] Add RLS policies for upvoting
- [ ] Create upvote button component
- [ ] Update upvote count in real-time
- [ ] Prevent duplicate upvotes

## Technical Details
- Database migration needed
- Frontend component in `components/UpvoteButton.tsx`
- Optimistic UI updates

## Labels
- `enhancement`
- `backend`
- `frontend`
```

### Issue 3: Competition Leaderboard
```markdown
Title: Build Competition Leaderboard Page

## Feature Description
Display a leaderboard showing participant rankings for a competition.

## Acceptance Criteria
- [ ] Fetch participants sorted by score
- [ ] Display rank, username, score
- [ ] Show user's own rank highlighted
- [ ] Real-time updates when scores change
- [ ] Responsive design

## Technical Details
- Create `CompetitionLeaderboardPage.tsx`
- Use Supabase real-time subscriptions
- Add route `/competitions/:slug/leaderboard`

## Labels
- `enhancement`
- `frontend`
- `good-first-issue`
```

---

## Issue Labels Reference

| Label | Description | Color |
|-------|-------------|-------|
| `good-first-issue` | Perfect for newcomers | Green |
| `frontend` | React/UI work | Blue |
| `backend` | Supabase/Database | Purple |
| `rls` | Row Level Security | Red |
| `bug` | Something isn't working | Red |
| `enhancement` | New feature | Green |
| `documentation` | Documentation improvements | Blue |
| `refactor` | Code refactoring | Yellow |
| `testing` | Test coverage | Orange |
| `ui/ux` | Design improvements | Pink |
| `security` | Security-related | Red |
| `performance` | Performance improvements | Orange |
| `deployment` | Deployment/DevOps | Purple |

---

## Contributing Workflow

1. **Find an Issue**
   - Browse issues with `good-first-issue` label
   - Read the issue description carefully
   - Check if anyone is already assigned

2. **Claim the Issue**
   - Comment: "I'd like to work on this!"
   - Wait for maintainer to assign you
   - Ask questions if anything is unclear

3. **Work on the Issue**
   - Fork the repository
   - Create a branch: `git checkout -b feature/issue-number`
   - Make your changes
   - Test thoroughly

4. **Submit a PR**
   - Push your branch
   - Create a Pull Request
   - Reference the issue: "Closes #123"
   - Fill in the PR template
   - Wait for review

5. **Address Feedback**
   - Respond to review comments
   - Make requested changes
   - Push updates to your branch

6. **Celebrate! 🎉**
   - Your PR gets merged
   - You're now a contributor!
   - Your name goes in the README

---

## Tips for Contributors

- **Start Small**: Pick `good-first-issue` labels first
- **Ask Questions**: Don't hesitate to ask in issue comments
- **Read Docs**: Check CONTRIBUTING.md and ARCHITECTURE.md
- **Test Locally**: Always test your changes before submitting
- **Follow Style**: Match the existing code style
- **Be Patient**: Maintainers will review as soon as possible
- **Be Respectful**: Follow the Code of Conduct

---

Happy Contributing! 🚀
