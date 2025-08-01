
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Login',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: 'Register',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="verify-otp" 
        options={{ 
          title: 'Verify OTP',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="profile-setup" 
        options={{ 
          title: 'Profile Setup',
          headerShown: false 
        }} 
      />
    </Stack>
  );
}
