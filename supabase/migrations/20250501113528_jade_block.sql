/*
  # Create members table and storage

  1. New Tables
    - `members`
      - `id` (uuid, primary key)
      - `full_name` (text, not null)
      - `role` (text, not null)
      - `email` (text, not null, unique)
      - `contact_number` (text, not null)
      - `profile_image_url` (text)
      - `created_at` (timestamptz, default now())
  
  2. Security
    - Enable RLS on `members` table
    - Add policies for members table access
*/

-- Create members table
CREATE TABLE IF NOT EXISTS members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  role text NOT NULL,
  email text NOT NULL UNIQUE,
  contact_number text NOT NULL,
  profile_image_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow anonymous read access to members"
  ON members
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow authenticated users to insert members"
  ON members
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create storage bucket for profile images
INSERT INTO storage.buckets (id, name, public)
VALUES ('team-members', 'team-members', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policy
CREATE POLICY "Public access to team-members bucket"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'team-members');

CREATE POLICY "Authenticated users can upload to team-members bucket"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'team-members');