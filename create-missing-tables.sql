
-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    age INTEGER,
    date_of_birth DATE,
    address_street TEXT,
    address_district TEXT,
    address_state TEXT,
    address_pincode TEXT,
    profile_completed BOOLEAN DEFAULT FALSE
);

-- Create venues table
CREATE TABLE IF NOT EXISTS public.venues (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL, -- 'church', 'mosque', 'hall', 'hotel', etc.
    location TEXT NOT NULL,
    address_street TEXT,
    address_district TEXT,
    address_state TEXT,
    address_pincode TEXT,
    price_range TEXT,
    capacity INTEGER,
    contact_phone TEXT,
    contact_email TEXT,
    images TEXT[], -- Array of image URLs
    amenities TEXT[], -- Array of amenities
    rating DECIMAL(2,1) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME,
    status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
    total_amount DECIMAL(10,2),
    special_requests TEXT,
    contact_phone TEXT,
    contact_email TEXT
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE NOT NULL,
    UNIQUE(user_id, venue_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for venues (public read access)
CREATE POLICY "Anyone can view venues" ON public.venues
    FOR SELECT USING (is_active = true);

-- Create policies for bookings
CREATE POLICY "Users can view own bookings" ON public.bookings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings" ON public.bookings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings" ON public.bookings
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for favorites
CREATE POLICY "Users can view own favorites" ON public.favorites
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites" ON public.favorites
    FOR ALL USING (auth.uid() = user_id);

-- Insert some sample venues
INSERT INTO public.venues (name, description, category, location, address_district, address_state, price_range, capacity, contact_phone, amenities, rating) VALUES
('Royal Palace Hall', 'Luxurious wedding hall with modern amenities', 'hall', 'Mumbai', 'Andheri', 'Maharashtra', '₹50,000-₹1,00,000', 300, '+91-9876543210', ARRAY['AC', 'Parking', 'Catering', 'Sound System'], 4.8),
('Sacred Heart Church', 'Beautiful church for Christian weddings', 'church', 'Goa', 'Panaji', 'Goa', '₹25,000-₹50,000', 200, '+91-9876543211', ARRAY['Parking', 'Sound System', 'Decoration'], 4.9),
('Grand Mosque Hall', 'Traditional mosque with wedding facilities', 'mosque', 'Hyderabad', 'Old City', 'Telangana', '₹30,000-₹75,000', 250, '+91-9876543212', ARRAY['AC', 'Parking', 'Sound System'], 4.7),
('Taj Wedding Resort', 'Premium hotel with wedding packages', 'hotel', 'Jaipur', 'City Palace Area', 'Rajasthan', '₹1,00,000-₹5,00,000', 500, '+91-9876543213', ARRAY['AC', 'Parking', 'Catering', 'Decoration', 'Photography'], 4.9);
