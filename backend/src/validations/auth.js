const { z } = require('zod');

// Login validation
const loginSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .min(1, 'Email is required'),
  password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
});

// Registration validation
const registerSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Name can only contain letters and spaces'),
  email: z.string()
    .email('Invalid email format')
    .min(1, 'Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
           'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  confirmPassword: z.string()
    .min(1, 'Please confirm your password'),
  phone: z.string()
    .regex(/^(\+212|0)[5-7][0-9]{8}$/, 'Please enter a valid Moroccan phone number'),
  address: z.object({
    street: z.string().min(5, 'Street address is too short'),
    city: z.string().min(2, 'City name is too short'),
    postalCode: z.string().regex(/^\d{5}$/, 'Invalid postal code format')
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Password reset validation
const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email format')
});

// New password validation
const newPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
           'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  confirmPassword: z.string()
    .min(1, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Profile update validation
const updateProfileSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .optional(),
  phone: z.string()
    .regex(/^(\+212|0)[5-7][0-9]{8}$/, 'Please enter a valid Moroccan phone number')
    .optional(),
  address: z.object({
    street: z.string().min(5, 'Street address is too short').optional(),
    city: z.string().min(2, 'City name is too short').optional(),
    postalCode: z.string().regex(/^\d{5}$/, 'Invalid postal code format').optional()
  }).optional()
});

module.exports = {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  newPasswordSchema,
  updateProfileSchema
};
