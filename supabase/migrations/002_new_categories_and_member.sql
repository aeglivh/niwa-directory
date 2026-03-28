-- Migration 002: Add Beauty & Style, Coaching & Consulting categories + is_niwa_member column
-- Run this in the Supabase SQL editor

-- 1. Update the category check constraint to include new categories
ALTER TABLE listings DROP CONSTRAINT IF EXISTS listings_category_check;
ALTER TABLE listings ADD CONSTRAINT listings_category_check CHECK (category IN (
  'Doctors', 'Food & Drink', 'Shopping & Markets',
  'Health & Wellness', 'Events & Culture', 'Services',
  'Beauty & Style', 'Coaching & Consulting'
));

-- 2. Add is_niwa_member column if it doesn't exist
ALTER TABLE listings ADD COLUMN IF NOT EXISTS is_niwa_member BOOLEAN NOT NULL DEFAULT FALSE;
