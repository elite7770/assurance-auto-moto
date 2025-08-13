const { z } = require('zod');

// Policy creation validation
const createPolicySchema = z.object({
  type: z.enum(['Auto', 'Moto', 'Commercial', 'Home'], {
    errorMap: () => ({ message: 'Type must be Auto, Moto, Commercial, or Home' })
  }),
  vehicle: z.object({
    brand: z.string().min(2, 'Brand must be at least 2 characters'),
    model: z.string().min(2, 'Model must be at least 2 characters'),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 1, 'Invalid year'),
    plateNumber: z.string().regex(/^[A-Z0-9]{1,10}$/, 'Invalid plate number format'),
    vin: z.string().optional(),
    engineSize: z.string().optional(),
    fuelType: z.enum(['Essence', 'Diesel', 'Électrique', 'Hybride']).optional()
  }),
  coverage: z.object({
    rcObligatoire: z.boolean().default(true),
    vol: z.boolean().default(false),
    incendie: z.boolean().default(false),
    brisGlace: z.boolean().default(false),
    assistance: z.boolean().default(false),
    defense: z.boolean().default(false),
    dommagesCollision: z.boolean().default(false),
    protectionConducteur: z.boolean().default(false)
  }),
  dates: z.object({
    startDate: z.string().datetime().or(z.date()),
    endDate: z.string().datetime().or(z.date()),
    renewalDate: z.string().datetime().or(z.date())
  }).refine((data) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const renewal = new Date(data.renewalDate);
    return start < end && end <= renewal;
  }, {
    message: 'Start date must be before end date, and renewal date must be after or equal to end date',
    path: ['dates']
  }),
  financial: z.object({
    premium: z.number().positive('Premium must be positive'),
    franchise: z.number().min(0, 'Franchise cannot be negative'),
    taxes: z.number().min(0, 'Taxes cannot be negative').default(0)
  }),
  notes: z.string().max(1000, 'Notes cannot exceed 1000 characters').optional(),
  agent: z.object({
    name: z.string().min(2, 'Agent name must be at least 2 characters').optional(),
    email: z.string().email('Invalid agent email').optional(),
    phone: z.string().regex(/^(\+212|0)[5-7][0-9]{8}$/, 'Invalid agent phone number').optional()
  }).optional()
});

// Policy update validation
const updatePolicySchema = z.object({
  type: z.enum(['Auto', 'Moto', 'Commercial', 'Home']).optional(),
  vehicle: z.object({
    brand: z.string().min(2).optional(),
    model: z.string().min(2).optional(),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
    plateNumber: z.string().regex(/^[A-Z0-9]{1,10}$/).optional(),
    vin: z.string().optional(),
    engineSize: z.string().optional(),
    fuelType: z.enum(['Essence', 'Diesel', 'Électrique', 'Hybride']).optional()
  }).optional(),
  coverage: z.object({
    rcObligatoire: z.boolean().optional(),
    vol: z.boolean().optional(),
    incendie: z.boolean().optional(),
    brisGlace: z.boolean().optional(),
    assistance: z.boolean().optional(),
    defense: z.boolean().optional(),
    dommagesCollision: z.boolean().optional(),
    protectionConducteur: z.boolean().optional()
  }).optional(),
  dates: z.object({
    startDate: z.string().datetime().or(z.date()).optional(),
    endDate: z.string().datetime().or(z.date()).optional(),
    renewalDate: z.string().datetime().or(z.date()).optional()
  }).optional(),
  financial: z.object({
    premium: z.number().positive().optional(),
    franchise: z.number().min(0).optional(),
    taxes: z.number().min(0).optional()
  }).optional(),
  status: z.enum(['Draft', 'Pending', 'Active', 'Suspended', 'Expired', 'Cancelled']).optional(),
  notes: z.string().max(1000).optional(),
  agent: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    phone: z.string().regex(/^(\+212|0)[5-7][0-9]{8}$/).optional()
  }).optional()
});

// Policy search/filter validation
const policyFilterSchema = z.object({
  type: z.enum(['Auto', 'Moto', 'Commercial', 'Home']).optional(),
  status: z.enum(['Draft', 'Pending', 'Active', 'Suspended', 'Expired', 'Cancelled']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  minPremium: z.number().min(0).optional(),
  maxPremium: z.number().min(0).optional(),
  search: z.string().max(100).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  sortBy: z.enum(['createdAt', 'updatedAt', 'startDate', 'endDate', 'premium', 'status']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

// Policy renewal validation
const policyRenewalSchema = z.object({
  renewalDate: z.string().datetime().or(z.date()),
  newPremium: z.number().positive('New premium must be positive'),
  newFranchise: z.number().min(0, 'New franchise cannot be negative'),
  coverageChanges: z.object({
    add: z.array(z.string()).optional(),
    remove: z.array(z.string()).optional()
  }).optional(),
  notes: z.string().max(1000).optional()
});

module.exports = {
  createPolicySchema,
  updatePolicySchema,
  policyFilterSchema,
  policyRenewalSchema
};
