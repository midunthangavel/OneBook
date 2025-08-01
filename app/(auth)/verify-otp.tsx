import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { Card } from '../../src/components/ui/Card';
import { colors } from '../../src/utils/constants/colors';
import { dimensions } from '../../src/utils/constants/dimensions';
import { useAuth } from '../../src/hooks/useAuth';
import { validateOtp } from '../../src/utils/validation';

export default function VerifyOtpScreen() {
  const { phone, email } = useLocalSearchParams<{ phone: string; email?: string }>();
  const { verifyOtp, sendOtp, isLoading, error, clearError } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    
    // Validate OTP
    const otpValidation = validateOtp(otpString);
    if (!otpValidation.isValid) {
      Alert.alert('Error', otpValidation.error || 'Please enter the complete 6-digit OTP');
      return;
    }

    clearError();
    const result = await verifyOtp(phone, otpString);
    
    if (result.success) {
      // Navigate to profile setup
      router.push({
        pathname: '/(auth)/profile-setup',
        params: { phone, email }
      });
    } else {
      Alert.alert('Error', result.error || 'Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    setTimeLeft(30);
    clearError();
    
    const result = await sendOtp(phone);
    if (result.success) {
      Alert.alert('Success', 'OTP has been resent to your phone number');
    } else {
      Alert.alert('Error', result.error || 'Failed to resend OTP. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit code to {phone}
          </Text>
        </View>

        <Card variant="elevated" padding="large" margin="medium">
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                style={styles.otpInput}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
                autoFocus={index === 0}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Verify OTP"
              onPress={handleVerifyOtp}
              variant="primary"
              size="large"
              fullWidth
              loading={isLoading}
              disabled={otp.join('').length !== 6}
            />
          </View>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Didn't receive the code?</Text>
          {timeLeft > 0 ? (
            <Text style={styles.timerText}>Resend in {timeLeft}s</Text>
          ) : (
            <Button
              title="Resend OTP"
              onPress={handleResendOtp}
              variant="ghost"
              size="medium"
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  content: {
    flex: 1,
    paddingHorizontal: dimensions.lg,
    justifyContent: 'center',
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
  
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: dimensions.lg,
  },
  
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: dimensions.borderRadius.md,
    fontSize: dimensions.fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    backgroundColor: colors.white,
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
  
  timerText: {
    fontSize: dimensions.fontSize.md,
    color: colors.textDisabled,
  },
}); 