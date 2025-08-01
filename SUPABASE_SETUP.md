# Supabase Setup Guide

## 1. Create Your `.env` File

Create a `.env` file in your project root directory with the following content:

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# API Configuration (optional)
EXPO_PUBLIC_API_URL=https://your-api-domain.com

# Other Environment Variables
NODE_ENV=development
```

## 2. Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or select an existing one
3. Go to **Settings** → **API**
4. Copy your **Project URL** and **anon public** key
5. Replace the placeholder values in your `.env` file

## 3. Install Supabase Dependencies

Run the following command in your project root:

```bash
npm install @supabase/supabase-js
```

## 4. Database Schema Setup

Create the following tables in your Supabase database:

### Users Table (profiles)
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Venues Table
```sql
CREATE TABLE venues (
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
```

### Bookings Table
```sql
CREATE TABLE bookings (
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
```

## 5. Row Level Security (RLS)

Enable RLS on your tables and create policies:

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

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
```

## 6. Test Your Connection

You can test your Supabase connection by running:

```typescript
import { supabase } from './src/services/supabaseService';

// Test connection
const testConnection = async () => {
  const { data, error } = await supabase.from('venues').select('*').limit(1);
  if (error) {
    console.error('Supabase connection failed:', error);
  } else {
    console.log('Supabase connection successful!');
  }
};
```

## 7. Environment Validation

The app includes environment validation. You can check if your environment is properly configured:

```typescript
import env from './src/utils/config/env';

const validation = env.validate();
if (!validation.isValid) {
  console.error('Environment validation failed:', validation.errors);
}
```

## 8. Features Available

With Supabase configured, you now have access to:

- ✅ **Authentication**: Email/password signup, login, logout
- ✅ **User Profiles**: Create, read, update user profiles
- ✅ **Venue Management**: CRUD operations for venues
- ✅ **Booking System**: Create and manage bookings
- ✅ **File Storage**: Upload and manage files
- ✅ **Real-time Features**: Real-time subscriptions (can be added)

## 9. Troubleshooting

### Common Issues:

1. **"Supabase URL or Anon Key not found"**
   - Check your `.env` file exists in the project root
   - Verify the environment variable names are correct
   - Restart your development server

2. **"Invalid API key"**
   - Verify your Supabase anon key is correct
   - Check that you're using the anon key, not the service role key

3. **"Row Level Security" errors**
   - Ensure RLS policies are properly configured
   - Check that users are authenticated before accessing protected data

4. **"Table does not exist"**
   - Verify your database schema is set up correctly
   - Check table names match your code

## 10. Next Steps

1. Set up your database schema
2. Configure authentication settings in Supabase dashboard
3. Test the connection
4. Start building your app features!

For more information, check the [Supabase Documentation](https://supabase.com/docs). 