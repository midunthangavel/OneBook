
-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  age INTEGER,
  date_of_birth DATE,
  address_street TEXT,
  address_district TEXT,
  address_state TEXT,
  address_pincode TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create venues table
CREATE TABLE IF NOT EXISTS public.venues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  price DECIMAL(10,2),
  rating DECIMAL(3,2),
  category TEXT,
  images TEXT[],
  amenities TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  status TEXT DEFAULT 'pending',
  amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, venue_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view and update own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Anyone can view venues" ON public.venues
  FOR SELECT USING (true);

CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites" ON public.favorites
  FOR ALL USING (auth.uid() = user_id);

-- Insert sample venues
INSERT INTO public.venues (name, description, location, price, rating, category, amenities) VALUES
('Royal Palace Hall', 'Elegant wedding hall with royal decorations', 'Mumbai', 75000, 4.8, 'Wedding Hall', ARRAY['AC', 'Parking', 'Catering', 'Sound System']),
('Garden View Resort', 'Beautiful resort with garden views', 'Pune', 120000, 4.9, 'Resort', ARRAY['AC', 'Parking', 'Catering', 'Garden', 'Pool']),
('Heritage Manor', 'Historic venue with modern amenities', 'Delhi', 90000, 4.7, 'Heritage', ARRAY['AC', 'Parking', 'Catering', 'Heritage Architecture'])
ON CONFLICT DO NOTHING;
