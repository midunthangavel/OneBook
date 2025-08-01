# Authentication Temporarily Disabled

## Overview
Authentication has been temporarily disabled to avoid Supabase paid upgrade requirements during development. The app now bypasses all authentication flows and goes directly to the main dashboard.

## What Was Changed

### 1. Main Entry Point (`app/index.tsx`)
- Commented out `useAuth` hook import
- Removed authentication loading states
- Changed button text from "Sign In" to "Get Started"
- Changed button text from "Create Account" to "Explore App"
- Both buttons now navigate directly to `/(main)/dashboard`

### 2. Main Layout (`app/(main)/_layout.tsx`)
- Commented out `useAuth` hook import
- Removed authentication guards that redirect to login
- Removed loading and user checks
- Users can now access main app without authentication

### 3. Profile Screen (`app/(main)/profile.tsx`)
- Commented out `useAuth` hook import
- Removed logout functionality
- Changed user display to show "Demo User" and "demo@example.com"
- Removed logout button

## How to Re-enable Authentication

### Step 1: Upgrade Supabase Account
- Upgrade your Supabase account to a paid plan that supports authentication
- Configure authentication providers (email, phone, etc.) in Supabase dashboard

### Step 2: Uncomment Authentication Code

#### In `app/index.tsx`:
```typescript
// Uncomment these lines:
import { useAuth } from '../src/hooks/useAuth';
const { user, loading } = useAuth();

// Uncomment the useEffect for auth redirect:
useEffect(() => {
  if (!loading && user) {
    router.replace('/(main)/dashboard');
  }
}, [user, loading]);

// Change button handlers back to auth routes:
const handleGetStarted = () => {
  router.push('/(auth)/login');
};

const handleRegister = () => {
  router.push('/(auth)/register');
};

// Uncomment loading check:
if (loading) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </SafeAreaView>
  );
}
```

#### In `app/(main)/_layout.tsx`:
```typescript
// Uncomment these lines:
import { useAuth } from '../../src/hooks/useAuth';
const { user, loading } = useAuth();

// Uncomment authentication guards:
useEffect(() => {
  if (!loading && !user) {
    router.replace('/');
  }
}, [user, loading]);

if (loading) {
  return null;
}

if (!user) {
  return null;
}
```

#### In `app/(main)/profile.tsx`:
```typescript
// Uncomment these lines:
import { useAuth } from '../../src/hooks/useAuth';
const { user, logout } = useAuth();

// Uncomment logout function:
const handleLogout = async () => {
  await logout();
  router.replace('/');
};

// Uncomment user data display:
{user?.firstName?.charAt(0) || 'U'}
{user?.firstName || 'User'} {user?.lastName || ''}
{user?.email || 'user@example.com'}

// Uncomment logout button:
<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
  <Ionicons name="log-out-outline" size={24} color={colors.error} />
  <Text style={styles.logoutText}>Logout</Text>
</TouchableOpacity>
```

### Step 3: Test Authentication
- Test login/register flows
- Test logout functionality
- Verify user data displays correctly
- Test authentication guards work properly

## Benefits of This Approach

1. **Cost Savings**: No Supabase authentication costs during development
2. **Faster Development**: No authentication setup required
3. **Easy to Re-enable**: All code is preserved and commented out
4. **Full Functionality**: Core app features work without authentication
5. **Future-Proof**: Easy to add authentication back when needed

## Current State

- ✅ App launches directly to dashboard
- ✅ All main features accessible without login
- ✅ Profile shows demo user data
- ✅ No authentication API calls
- ✅ No Supabase authentication costs
- ✅ Database connection still works for other features

## Notes

- All authentication-related code is preserved and commented out
- The app uses demo data instead of real user data
- Database operations that don't require authentication still work
- When ready to add authentication back, simply uncomment the code 