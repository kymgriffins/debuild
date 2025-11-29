-- Create waitlist table for storing email subscriptions
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  source TEXT DEFAULT 'website_modal',
  is_active BOOLEAN DEFAULT TRUE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist(email);
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON waitlist(created_at);
CREATE INDEX IF NOT EXISTS waitlist_source_idx ON waitlist(source);

-- Enable RLS (Row Level Security)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read (for admin purposes)
CREATE POLICY "Allow authenticated users to read waitlist" ON waitlist
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy to allow anyone to insert (for public signup)
CREATE POLICY "Allow public waitlist signup" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Create policy to allow users to manage their own entries (update/delete)
CREATE POLICY "Allow users to manage their own waitlist entries" ON waitlist
  FOR ALL USING (auth.jwt() ->> 'email' = email);

-- Add comments for documentation
COMMENT ON TABLE waitlist IS 'Waitlist email subscriptions for new features and updates';
COMMENT ON COLUMN waitlist.email IS 'User email address (must be unique)';
COMMENT ON COLUMN waitlist.created_at IS 'Timestamp when the user joined the waitlist';
COMMENT ON COLUMN waitlist.source IS 'Where the user signed up from (e.g., website_modal, landing_page)';
COMMENT ON COLUMN waitlist.is_active IS 'Whether this email subscription is still active';
