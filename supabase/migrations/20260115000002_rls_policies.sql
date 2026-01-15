-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tribes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tribe_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competition_participants ENABLE ROW LEVEL SECURITY;

-- =============================================
-- USERS POLICIES
-- =============================================

-- Anyone can view public user profiles
CREATE POLICY "Users are viewable by everyone"
  ON public.users FOR SELECT
  USING (true);

-- Users can insert their own profile (on signup)
CREATE POLICY "Users can insert their own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- =============================================
-- TRIBES POLICIES
-- =============================================

-- Public tribes are viewable by everyone
CREATE POLICY "Public tribes are viewable by everyone"
  ON public.tribes FOR SELECT
  USING (visibility = 'public');

-- Private tribes are viewable by members only
CREATE POLICY "Private tribes are viewable by members"
  ON public.tribes FOR SELECT
  USING (
    visibility = 'private' AND
    EXISTS (
      SELECT 1 FROM public.tribe_members
      WHERE tribe_id = tribes.id AND user_id = auth.uid()
    )
  );

-- Authenticated users can create tribes
CREATE POLICY "Authenticated users can create tribes"
  ON public.tribes FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Only tribe admins can update tribes
CREATE POLICY "Tribe admins can update tribes"
  ON public.tribes FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.tribe_members
      WHERE tribe_id = tribes.id 
        AND user_id = auth.uid() 
        AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.tribe_members
      WHERE tribe_id = tribes.id 
        AND user_id = auth.uid() 
        AND role = 'admin'
    )
  );

-- Only tribe admins can delete tribes
CREATE POLICY "Tribe admins can delete tribes"
  ON public.tribes FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.tribe_members
      WHERE tribe_id = tribes.id 
        AND user_id = auth.uid() 
        AND role = 'admin'
    )
  );

-- =============================================
-- TRIBE MEMBERS POLICIES
-- =============================================

-- Members can view other members in their tribes
CREATE POLICY "Tribe members are viewable by tribe members"
  ON public.tribe_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.tribe_members tm
      WHERE tm.tribe_id = tribe_members.tribe_id 
        AND tm.user_id = auth.uid()
    )
  );

-- Users can join public tribes
CREATE POLICY "Users can join public tribes"
  ON public.tribe_members FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.tribes
      WHERE id = tribe_id AND visibility = 'public'
    )
  );

-- Users can leave tribes (delete their membership)
CREATE POLICY "Users can leave tribes"
  ON public.tribe_members FOR DELETE
  USING (auth.uid() = user_id);

-- Admins can remove members
CREATE POLICY "Admins can remove members"
  ON public.tribe_members FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.tribe_members tm
      WHERE tm.tribe_id = tribe_members.tribe_id 
        AND tm.user_id = auth.uid() 
        AND tm.role = 'admin'
    )
  );

-- =============================================
-- TOPICS POLICIES
-- =============================================

-- Topics in public tribes are viewable by everyone
CREATE POLICY "Topics in public tribes are viewable by everyone"
  ON public.topics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.tribes
      WHERE id = topics.tribe_id AND visibility = 'public'
    )
  );

-- Topics in private tribes are viewable by members only
CREATE POLICY "Topics in private tribes are viewable by members"
  ON public.topics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.tribes t
      JOIN public.tribe_members tm ON t.id = tm.tribe_id
      WHERE t.id = topics.tribe_id 
        AND t.visibility = 'private'
        AND tm.user_id = auth.uid()
    )
  );

-- Tribe members can create topics
CREATE POLICY "Tribe members can create topics"
  ON public.topics FOR INSERT
  WITH CHECK (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM public.tribe_members
      WHERE tribe_id = topics.tribe_id AND user_id = auth.uid()
    )
  );

-- Topic creators can update their topics
CREATE POLICY "Topic creators can update their topics"
  ON public.topics FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Topic creators can delete their topics
CREATE POLICY "Topic creators can delete their topics"
  ON public.topics FOR DELETE
  USING (auth.uid() = created_by);

-- =============================================
-- TOPIC REPLIES POLICIES
-- =============================================

-- Replies are viewable if the topic is viewable
CREATE POLICY "Replies are viewable if topic is viewable"
  ON public.topic_replies FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.topics t
      JOIN public.tribes tr ON t.tribe_id = tr.id
      WHERE t.id = topic_replies.topic_id
        AND (
          tr.visibility = 'public' OR
          EXISTS (
            SELECT 1 FROM public.tribe_members tm
            WHERE tm.tribe_id = tr.id AND tm.user_id = auth.uid()
          )
        )
    )
  );

-- Tribe members can create replies
CREATE POLICY "Tribe members can create replies"
  ON public.topic_replies FOR INSERT
  WITH CHECK (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM public.topics t
      JOIN public.tribe_members tm ON t.tribe_id = tm.tribe_id
      WHERE t.id = topic_replies.topic_id AND tm.user_id = auth.uid()
    )
  );

-- Reply creators can update their replies
CREATE POLICY "Reply creators can update their replies"
  ON public.topic_replies FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Reply creators can delete their replies
CREATE POLICY "Reply creators can delete their replies"
  ON public.topic_replies FOR DELETE
  USING (auth.uid() = created_by);

-- =============================================
-- COMPETITIONS POLICIES
-- =============================================

-- All competitions are viewable by everyone (except drafts)
CREATE POLICY "Non-draft competitions are viewable by everyone"
  ON public.competitions FOR SELECT
  USING (status != 'draft');

-- Draft competitions are viewable by creator only
CREATE POLICY "Draft competitions are viewable by creator"
  ON public.competitions FOR SELECT
  USING (status = 'draft' AND created_by = auth.uid());

-- Authenticated users can create competitions
CREATE POLICY "Authenticated users can create competitions"
  ON public.competitions FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Competition creators can update their competitions
CREATE POLICY "Competition creators can update their competitions"
  ON public.competitions FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Competition creators can delete their competitions
CREATE POLICY "Competition creators can delete their competitions"
  ON public.competitions FOR DELETE
  USING (auth.uid() = created_by);

-- =============================================
-- COMPETITION PARTICIPANTS POLICIES
-- =============================================

-- Participants are viewable by everyone
CREATE POLICY "Competition participants are viewable by everyone"
  ON public.competition_participants FOR SELECT
  USING (true);

-- Users can join competitions
CREATE POLICY "Users can join competitions"
  ON public.competition_participants FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own participation
CREATE POLICY "Users can update their own participation"
  ON public.competition_participants FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can leave competitions (before submission)
CREATE POLICY "Users can leave competitions"
  ON public.competition_participants FOR DELETE
  USING (auth.uid() = user_id AND submitted_at IS NULL);
