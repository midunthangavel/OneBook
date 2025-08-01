import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { colors } from '../../src/utils/constants/colors';
import { dimensions } from '../../src/utils/constants/dimensions';
import { supabase } from '../../src/services/supabaseService';
import { Icon, AppIcons } from '../../src/components/ui/Icon';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert('Login Failed', error.message);
      } else {
        router.replace('/(main)/dashboard');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Icon 
              library={AppIcons.email.library} 
              name={AppIcons.email.name} 
              size={20} 
              color={colors.textSecondary} 
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon 
              library={AppIcons.lock.library} 
              name={AppIcons.lock.name} 
              size={20} 
              color={colors.textSecondary} 
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor={colors.textSecondary}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon 
                library={AppIcons.visibility.library} 
                name={showPassword ? AppIcons.visibilityOff.name : AppIcons.visibility.name} 
                size={20} 
                color={colors.textSecondary} 
              />
            </TouchableOpacity>
          </View>

          <Button
            title={loading ? "Signing In..." : "Sign In"}
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />
        </View>

        <View style={styles.navigationLinks}>
          <TouchableOpacity 
            style={styles.registerLink}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.registerText}>
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backLink}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>
              ← Back to Welcome
            </Text>
          </TouchableOpacity>
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
    padding: dimensions.screenPadding,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginLeft: 12,
  },
  inputWithIcon: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  loginButton: {
    marginTop: 8,
  },
  registerLink: {
    alignItems: 'center',
    marginTop: 16,
  },
  registerText: {
    color: colors.primary,
    fontSize: 16,
  },
  navigationLinks: {
    marginTop: 16,
    alignItems: 'center',
  },
  backLink: {
    marginTop: 8,
  },
  backText: {
    color: colors.primary,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10
  }
});