-- Supabase Database Setup
-- Run these commands in your Supabase SQL editor

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create venues table
CREATE TABLE IF NOT EXISTS venues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  category TEXT,
  price_range TEXT,
  rating DECIMAL DEFAULT 0,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  venue_id UUID REFERENCES venues(id),
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  guest_count INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending',
  total_amount DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies
-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Venues policies
CREATE POLICY "Anyone can view venues" ON venues
  FOR SELECT USING (true);

-- Bookings policies
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings" ON bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- 6. Insert sample data (optional)
INSERT INTO venues (name, description, address, category, price_range, rating) VALUES
('The Grand Hall', 'Elegant wedding venue with modern amenities', '123 Main St, City', 'Wedding', '$$$', 4.5),
('Riverside Gardens', 'Beautiful outdoor venue by the river', '456 River Rd, City', 'Outdoor', '$$', 4.2),
('Urban Loft', 'Modern industrial space for events', '789 Industrial Ave, City', 'Corporate', '$$$', 4.0)
ON CONFLICT DO NOTHING;
