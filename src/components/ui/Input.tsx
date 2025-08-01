
import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '../../utils/constants/colors';
import { dimensions } from '../../utils/constants/dimensions';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, leftIcon && styles.inputWithLeftIcon, rightIcon && styles.inputWithRightIcon, style]}
          placeholderTextColor={colors.textSecondary}
          {...props}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: dimensions.md,
  },
  label: {
    fontSize: dimensions.fontSize.sm,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: dimensions.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: dimensions.borderRadius.sm,
    backgroundColor: colors.surface,
  },
  inputError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    paddingVertical: dimensions.md,
    paddingHorizontal: dimensions.md,
    fontSize: dimensions.fontSize.md,
    color: colors.textPrimary,
  },
  inputWithLeftIcon: {
    paddingLeft: dimensions.sm,
  },
  inputWithRightIcon: {
    paddingRight: dimensions.sm,
  },
  leftIcon: {
    paddingLeft: dimensions.md,
  },
  rightIcon: {
    paddingRight: dimensions.md,
  },
  errorText: {
    fontSize: dimensions.fontSize.xs,
    color: colors.error,
    marginTop: dimensions.xs,
  },
});
