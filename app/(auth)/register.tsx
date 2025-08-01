import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { Card } from '../../src/components/ui/Card';
import { colors } from '../../src/utils/constants/colors';
import { dimensions } from '../../src/utils/constants/dimensions';
import { useAuth } from '../../src/hooks/useAuth';
import { validatePhone, validateEmail } from '../../src/utils/validation';

export default function RegisterScreen() {
  const { sendOtp, isLoading, error, clearError } = useAuth();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});

  const validateForm = () => {
    const newErrors: { phone?: string; email?: string } = {};

    // Phone validation
    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.error;
    }

    // Email validation (optional)
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateForm()) return;

    clearError();
    const result = await sendOtp(phone);
    
    if (result.success) {
      // Navigate to OTP verification screen
      router.push({
        pathname: '/(auth)/verify-otp',
        params: { phone, email }
      });
    } else {
      Alert.alert('Error', result.error || 'Failed to send OTP. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Enter your details to get started</Text>
        </View>

        <Card variant="elevated" padding="large" margin="medium">
          <Input
            label="Phone Number"
            placeholder="+1234567890"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            error={errors.phone}
            leftIcon={<Text style={styles.icon}>📱</Text>}
          />

          <Input
            label="Email (Optional)"
            placeholder="your.email@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            leftIcon={<Text style={styles.icon}>📧</Text>}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Send OTP"
              onPress={handleSendOtp}
              variant="primary"
              size="large"
              fullWidth
              loading={isLoading}
            />
          </View>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Button
            title="Sign In"
            onPress={() => router.push('/(auth)/login')}
            variant="ghost"
            size="medium"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: dimensions.lg,
    paddingTop: dimensions.xxl,
    paddingBottom: dimensions.xl,
  },
  
  header: {
    alignItems: 'center',
    marginBottom: dimensions.xxl,
  },
  
  title: {
    fontSize: dimensions.fontSize.xxl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: dimensions.sm,
  },
  
  subtitle: {
    fontSize: dimensions.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  
  buttonContainer: {
    marginTop: dimensions.lg,
  },
  
  footer: {
    alignItems: 'center',
    marginTop: dimensions.xl,
  },
  
  footerText: {
    fontSize: dimensions.fontSize.md,
    color: colors.textSecondary,
    marginBottom: dimensions.sm,
  },
  
  icon: {
    fontSize: dimensions.fontSize.md,
  },
}); 