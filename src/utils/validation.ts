export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }

  // International phone number format with country code
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Please enter a valid phone number with country code' };
  }

  return { isValid: true };
};

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: true }; // Email is optional
  }

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
};

export const validateOtp = (otp: string): ValidationResult => {
  if (!otp) {
    return { isValid: false, error: 'OTP is required' };
  }

  if (otp.length !== 6) {
    return { isValid: false, error: 'OTP must be 6 digits' };
  }

  if (!/^\d{6}$/.test(otp)) {
    return { isValid: false, error: 'OTP must contain only numbers' };
  }

  return { isValid: true };
};

export const validateName = (name: string, fieldName: string = 'Name'): ValidationResult => {
  if (!name) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (name.length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters` };
  }

  if (name.length > 50) {
    return { isValid: false, error: `${fieldName} must be less than 50 characters` };
  }

  // Only letters, spaces, and common punctuation
  const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
  if (!nameRegex.test(name)) {
    return { isValid: false, error: `${fieldName} contains invalid characters` };
  }

  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }

  if (password.length > 128) {
    return { isValid: false, error: 'Password must be less than 128 characters' };
  }

  // At least one uppercase, one lowercase, one number
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
    return { 
      isValid: false, 
      error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' 
    };
  }

  return { isValid: true };
};

export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }

  return { isValid: true };
};

export const validateAddress = (address: {
  street: string;
  district: string;
  state: string;
  pincode: string;
}): ValidationResult => {
  if (!address.street) {
    return { isValid: false, error: 'Street address is required' };
  }

  if (!address.district) {
    return { isValid: false, error: 'District is required' };
  }

  if (!address.state) {
    return { isValid: false, error: 'State is required' };
  }

  if (!address.pincode) {
    return { isValid: false, error: 'Pincode is required' };
  }

  // Validate pincode (6 digits for Indian pincodes)
  const pincodeRegex = /^\d{6}$/;
  if (!pincodeRegex.test(address.pincode)) {
    return { isValid: false, error: 'Please enter a valid 6-digit pincode' };
  }

  return { isValid: true };
};

export const validateDate = (date: string): ValidationResult => {
  if (!date) {
    return { isValid: false, error: 'Date is required' };
  }

  const selectedDate = new Date(date);
  const today = new Date();

  if (isNaN(selectedDate.getTime())) {
    return { isValid: false, error: 'Please enter a valid date' };
  }

  if (selectedDate < today) {
    return { isValid: false, error: 'Date cannot be in the past' };
  }

  return { isValid: true };
};

export const validateGuestCount = (count: number): ValidationResult => {
  if (!count || count <= 0) {
    return { isValid: false, error: 'Guest count must be greater than 0' };
  }

  if (count > 1000) {
    return { isValid: false, error: 'Guest count cannot exceed 1000' };
  }

  return { isValid: true };
};

export const validatePrice = (price: number): ValidationResult => {
  if (!price || price < 0) {
    return { isValid: false, error: 'Price must be greater than 0' };
  }

  if (price > 1000000) {
    return { isValid: false, error: 'Price cannot exceed 1,000,000' };
  }

  return { isValid: true };
}; 