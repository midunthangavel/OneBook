import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { Card } from '../../src/components/ui/Card';
import { colors } from '../../src/utils/constants/colors';
import { dimensions } from '../../src/utils/constants/dimensions';
import { useAuth } from '../../src/hooks/useAuth';
import { validateName, validateAddress } from '../../src/utils/validation';
import { Address } from '../../src/utils/types/common';

export default function ProfileSetupScreen() {
  const { phone, email } = useLocalSearchParams<{ phone: string; email?: string }>();
  const { updateUser, isLoading, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: {
      street: '',
      district: '',
      state: '',
      pincode: '',
    } as Address,
  });
  
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    address?: {
      street?: string;
      district?: string;
      state?: string;
      pincode?: string;
    };
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Validate names
    const firstNameValidation = validateName(formData.firstName, 'First Name');
    if (!firstNameValidation.isValid) {
      newErrors.firstName = firstNameValidation.error;
    }

    const lastNameValidation = validateName(formData.lastName, 'Last Name');
    if (!lastNameValidation.isValid) {
      newErrors.lastName = lastNameValidation.error;
    }

    // Validate address
    const addressValidation = validateAddress(formData.address);
    if (!addressValidation.isValid) {
      newErrors.address = {
        street: addressValidation.error?.includes('Street') ? addressValidation.error : undefined,
        district: addressValidation.error?.includes('District') ? addressValidation.error : undefined,
        state: addressValidation.error?.includes('State') ? addressValidation.error : undefined,
        pincode: addressValidation.error?.includes('Pincode') ? addressValidation.error : undefined,
      };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    clearError();
    
    try {
      // Create user profile
      const userData = {
        phone,
        email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
      };

      // TODO: Call API to create user profile
      // const result = await authService.createProfile(userData);
      
      // For now, simulate success
      Alert.alert(
        'Success', 
        'Profile created successfully!',
        [
          {
            text: 'Continue',
            onPress: () => router.push('/(main)/dashboard')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create profile. Please try again.');
    }
  };

  const updateAddress = (field: keyof Address, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>Tell us a bit about yourself</Text>
        </View>

        <Card variant="elevated" padding="large" margin="medium">
          <Input
            label="First Name"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
            error={errors.firstName}
            leftIcon={<Text style={styles.icon}>👤</Text>}
          />

          <Input
            label="Last Name"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
            error={errors.lastName}
            leftIcon={<Text style={styles.icon}>👤</Text>}
          />

          <Input
            label="Date of Birth (Optional)"
            placeholder="YYYY-MM-DD"
            value={formData.dateOfBirth}
            onChangeText={(text) => setFormData(prev => ({ ...prev, dateOfBirth: text }))}
            error={errors.dateOfBirth}
            leftIcon={<Text style={styles.icon}>📅</Text>}
          />

          <View style={styles.addressSection}>
            <Text style={styles.sectionTitle}>Address</Text>
            
            <Input
              label="Street Address"
              placeholder="Enter your street address"
              value={formData.address.street}
              onChangeText={(text) => updateAddress('street', text)}
              error={errors.address?.street}
              leftIcon={<Text style={styles.icon}>🏠</Text>}
            />

            <Input
              label="District"
              placeholder="Enter your district"
              value={formData.address.district}
              onChangeText={(text) => updateAddress('district', text)}
              error={errors.address?.district}
              leftIcon={<Text style={styles.icon}>🏛️</Text>}
            />

            <Input
              label="State"
              placeholder="Enter your state"
              value={formData.address.state}
              onChangeText={(text) => updateAddress('state', text)}
              error={errors.address?.state}
              leftIcon={<Text style={styles.icon}>🗺️</Text>}
            />

            <Input
              label="Pincode"
              placeholder="Enter 6-digit pincode"
              value={formData.address.pincode}
              onChangeText={(text) => updateAddress('pincode', text)}
              keyboardType="numeric"
              maxLength={6}
              error={errors.address?.pincode}
              leftIcon={<Text style={styles.icon}>📮</Text>}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Complete Profile"
              onPress={handleSubmit}
              variant="primary"
              size="large"
              fullWidth
              loading={isLoading}
            />
          </View>
        </Card>
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
  
  addressSection: {
    marginTop: dimensions.lg,
  },
  
  sectionTitle: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: dimensions.md,
  },
  
  buttonContainer: {
    marginTop: dimensions.xl,
  },
  
  icon: {
    fontSize: dimensions.fontSize.md,
  },
}); 