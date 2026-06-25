-- Run this in your Supabase SQL Editor

-- Create analyzed_problems table
CREATE TABLE IF NOT EXISTS public.analyzed_problems (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    pattern TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create vault_entries table
CREATE TABLE IF NOT EXISTS public.vault_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    problem_text TEXT NOT NULL,
    analysis JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create buddy_chats table
CREATE TABLE IF NOT EXISTS public.buddy_chats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    messages JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Optional but good practice)
ALTER TABLE public.analyzed_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buddy_chats ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Users can insert their own analyzed_problems" 
ON public.analyzed_problems FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own analyzed_problems" 
ON public.analyzed_problems FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own vault_entries" 
ON public.vault_entries FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own vault_entries" 
ON public.vault_entries FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own vault_entries" 
ON public.vault_entries FOR DELETE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own buddy_chats" 
ON public.buddy_chats FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own buddy_chats" 
ON public.buddy_chats FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own buddy_chats" 
ON public.buddy_chats FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own buddy_chats" 
ON public.buddy_chats FOR DELETE 
USING (auth.uid() = user_id);

-- Notify PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema';
