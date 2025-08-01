const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Supabase integration...\n');

// Create .env file
const envContent = `# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# API Configuration (optional)
EXPO_PUBLIC_API_URL=https://your-api-domain.com

# Other Environment Variables
NODE_ENV=development
`;

try {
  fs.writeFileSync('.env', envContent);
  console.log('✅ Created .env file with placeholder values');
  console.log('   Please replace the placeholder values with your actual Supabase credentials\n');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
}

// Check if package.json exists and add Supabase dependency
try {
  const packagePath = path.join(__dirname, 'package.json');
  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    if (!packageJson.dependencies['@supabase/supabase-js']) {
      console.log('📦 Adding @supabase/supabase-js to dependencies...');
      console.log('   Run: npm install @supabase/supabase-js\n');
    } else {
      console.log('✅ @supabase/supabase-js is already in dependencies\n');
    }
  }
} catch (error) {
  console.error('❌ Error reading package.json:', error.message);
}

// Create database setup SQL file
const sqlContent = `-- Supabase Database Setup
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
`;

try {
  fs.writeFileSync('supabase-setup.sql', sqlContent);
  console.log('✅ Created supabase-setup.sql with database schema');
  console.log('   Run this SQL in your Supabase SQL editor\n');
} catch (error) {
  console.error('❌ Error creating SQL file:', error.message);
}

console.log('📋 Next Steps:');
console.log('1. Get your Supabase credentials from https://app.supabase.com');
console.log('2. Update the .env file with your actual credentials');
console.log('3. Run: npm install @supabase/supabase-js');
console.log('4. Execute the SQL commands in supabase-setup.sql');
console.log('5. Test your connection using the test utilities\n');

console.log('🎉 Setup complete! Check SUPABASE_SETUP.md for detailed instructions.'); 