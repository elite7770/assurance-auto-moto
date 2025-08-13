const { z } = require('zod');

// Claim creation validation
const createClaimSchema = z.object({
  policyId: z.string().min(1, 'Policy ID is required'),
  type: z.enum(['Accident', 'Vol', 'Dégâts', 'Incendie', 'Bris de glace', 'Assistance', 'Autre'], {
    errorMap: () => ({ message: 'Invalid claim type' })
  }),
  incident: z.object({
    date: z.string().datetime().or(z.date()),
    time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
    location: z.object({
      address: z.string().min(10, 'Address must be at least 10 characters'),
      city: z.string().min(2, 'City must be at least 2 characters'),
      coordinates: z.object({
        lat: z.number().min(-90).max(90).optional(),
        lng: z.number().min(-180).max(180).optional()
      }).optional()
    }),
    description: z.string().min(20, 'Description must be at least 20 characters').max(2000, 'Description cannot exceed 2000 characters'),
    witnesses: z.array(z.object({
      name: z.string().min(2, 'Witness name must be at least 2 characters'),
      phone: z.string().regex(/^(\+212|0)[5-7][0-9]{8}$/, 'Invalid phone number format'),
      statement: z.string().min(10, 'Witness statement must be at least 10 characters').max(500, 'Witness statement cannot exceed 500 characters')
    })).max(5, 'Maximum 5 witnesses allowed').optional()
  }),
  damages: z.object({
    estimatedAmount: z.number().positive('Estimated amount must be positive'),
    currency: z.string().default('MAD'),
    details: z.array(z.object({
      item: z.string().min(2, 'Item name must be at least 2 characters'),
      description: z.string().min(10, 'Damage description must be at least 10 characters').max(500, 'Description cannot exceed 500 characters'),
      estimatedCost: z.number().positive('Estimated cost must be positive')
    })).min(1, 'At least one damage item is required').max(20, 'Maximum 20 damage items allowed')
  }),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']).default('Medium'),
  notes: z.string().max(1000, 'Notes cannot exceed 1000 characters').optional()
});

// Claim update validation
const updateClaimSchema = z.object({
  type: z.enum(['Accident', 'Vol', 'Dégâts', 'Incendie', 'Bris de glace', 'Assistance', 'Autre']).optional(),
  incident: z.object({
    date: z.string().datetime().or(z.date()).optional(),
    time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    location: z.object({
      address: z.string().min(10).optional(),
      city: z.string().min(2).optional(),
      coordinates: z.object({
        lat: z.number().min(-90).max(90).optional(),
        lng: z.number().min(-180).max(180).optional()
      }).optional()
    }).optional(),
    description: z.string().min(20).max(2000).optional(),
    witnesses: z.array(z.object({
      name: z.string().min(2),
      phone: z.string().regex(/^(\+212|0)[5-7][0-9]{8}$/),
      statement: z.string().min(10).max(500)
    })).max(5).optional()
  }).optional(),
  damages: z.object({
    estimatedAmount: z.number().positive().optional(),
    actualAmount: z.number().min(0).optional(),
    currency: z.string().optional(),
    details: z.array(z.object({
      item: z.string().min(2).optional(),
      description: z.string().min(10).max(500).optional(),
      estimatedCost: z.number().positive().optional(),
      actualCost: z.number().min(0).optional(),
      status: z.enum(['Pending', 'Approved', 'Rejected', 'Completed']).optional()
    })).max(20).optional()
  }).optional(),
  status: z.enum(['Draft', 'Submitted', 'Under Review', 'Investigation', 'Approved', 'Rejected', 'Closed', 'Reopened']).optional(),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']).optional(),
  notes: z.string().max(1000).optional()
});

// Claim filter/search validation
const claimFilterSchema = z.object({
  type: z.enum(['Accident', 'Vol', 'Dégâts', 'Incendie', 'Bris de glace', 'Assistance', 'Autre']).optional(),
  status: z.enum(['Draft', 'Submitted', 'Under Review', 'Investigation', 'Approved', 'Rejected', 'Closed', 'Reopened']).optional(),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']).optional(),
  policyId: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().min(0).optional(),
  search: z.string().max(100).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  sortBy: z.enum(['createdAt', 'updatedAt', 'incident.date', 'damages.estimatedAmount', 'status', 'priority']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

// Document upload validation
const documentUploadSchema = z.object({
  type: z.enum(['photo', 'police_report', 'medical_report', 'estimate', 'other'], {
    errorMap: () => ({ message: 'Invalid document type' })
  }),
  description: z.string().max(500, 'Description cannot exceed 500 characters').optional()
});

// Communication validation
const communicationSchema = z.object({
  type: z.enum(['email', 'phone', 'sms', 'in_person'], {
    errorMap: () => ({ message: 'Invalid communication type' })
  }),
  direction: z.enum(['inbound', 'outbound'], {
    errorMap: () => ({ message: 'Invalid communication direction' })
  }),
  summary: z.string().min(10, 'Summary must be at least 10 characters').max(500, 'Summary cannot exceed 500 characters'),
  internal: z.boolean().default(false)
});

// Note validation
const noteSchema = z.object({
  note: z.string().min(5, 'Note must be at least 5 characters').max(1000, 'Note cannot exceed 1000 characters'),
  type: z.enum(['user', 'agent', 'system']).default('user')
});

// Timeline entry validation
const timelineEntrySchema = z.object({
  status: z.enum(['Draft', 'Submitted', 'Under Review', 'Investigation', 'Approved', 'Rejected', 'Closed', 'Reopened'], {
    errorMap: () => ({ message: 'Invalid status' })
  }),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description cannot exceed 500 characters'),
  internal: z.boolean().default(false)
});

// Settlement validation
const settlementSchema = z.object({
  amount: z.number().positive('Settlement amount must be positive'),
  currency: z.string().default('MAD'),
  method: z.enum(['Bank Transfer', 'Check', 'Cash', 'Credit'], {
    errorMap: () => ({ message: 'Invalid settlement method' })
  }),
  reference: z.string().min(1, 'Reference is required'),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional()
});

module.exports = {
  createClaimSchema,
  updateClaimSchema,
  claimFilterSchema,
  documentUploadSchema,
  communicationSchema,
  noteSchema,
  timelineEntrySchema,
  settlementSchema
};
