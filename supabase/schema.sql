-- NIWA Vienna Directory — Database Schema
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'Doctors', 'Food & Drink', 'Shopping & Markets',
    'Health & Wellness', 'Events & Culture', 'Services',
    'Beauty & Style', 'Coaching & Consulting'
  )),
  specialty TEXT,
  description TEXT NOT NULL,
  address TEXT,
  district INTEGER CHECK (district BETWEEN 1 AND 23),
  website TEXT,
  instagram TEXT,
  phone TEXT,
  tags TEXT[],
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'rejected')),
  submitted_by TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  og_image TEXT
);

-- Enable Row Level Security
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Public can read published listings only
CREATE POLICY "Public can read published listings"
  ON listings FOR SELECT
  USING (status = 'published');

-- Anyone can submit (insert as pending)
CREATE POLICY "Anyone can submit a listing"
  ON listings FOR INSERT
  WITH CHECK (status = 'pending');

-- Index for fast filtering
CREATE INDEX IF NOT EXISTS listings_category_idx ON listings (category);
CREATE INDEX IF NOT EXISTS listings_status_idx ON listings (status);
CREATE INDEX IF NOT EXISTS listings_district_idx ON listings (district);
