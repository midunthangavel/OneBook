
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

console.log('🧪 Testing Supabase Connection...\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.log('Please ensure you have:');
  console.log('- EXPO_PUBLIC_SUPABASE_URL');
  console.log('- EXPO_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('📡 Testing basic connection...');
    
    // Test 1: Basic connection
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Basic connection successful');
    
    // Test 2: Auth service
    console.log('🔐 Testing auth service...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.warn('⚠️  Auth test warning:', authError.message);
    } else {
      console.log('✅ Auth service accessible');
    }
    
    // Test 3: Check if required tables exist
    console.log('📋 Checking database schema...');
    const tables = ['profiles', 'venues', 'bookings', 'favorites'];
    
    for (const table of tables) {
      try {
        const { error: tableError } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (tableError) {
          console.warn(`⚠️  Table '${table}' may not exist or has RLS issues:`, tableError.message);
        } else {
          console.log(`✅ Table '${table}' accessible`);
        }
      } catch (err) {
        console.warn(`⚠️  Error checking table '${table}':`, err.message);
      }
    }
    
    console.log('\n🎉 Supabase connection test completed!');
    console.log('If you saw any warnings above, you may need to create the database tables.');
    console.log('Refer to SUPABASE_SETUP.md for schema setup instructions.');
    
    return true;
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return false;
  }
}

testConnection();
