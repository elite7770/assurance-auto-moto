const express = require('express');
const router = express.Router();

// Import models and middleware
const Policy = require('../models/Policy');
const { verifyAccessToken } = require('../middleware/auth');

// Import validation schemas
const {
  createPolicySchema,
  updatePolicySchema,
  policyFilterSchema,
  policyRenewalSchema
} = require('../validations/policy');

// Helper function to calculate total amount
const calculateTotalAmount = (premium, franchise, taxes = 0) => {
  return premium + franchise + taxes;
};

// GET /api/policies - Get all policies for authenticated user with filtering
router.get('/', verifyAccessToken, async (req, res) => {
  try {
    // Validate query parameters
    const validatedQuery = policyFilterSchema.parse(req.query);
    
    // Build filter object
    const filter = { userId: req.user._id };
    
    if (validatedQuery.type) filter.type = validatedQuery.type;
    if (validatedQuery.status) filter.status = validatedQuery.status;
    if (validatedQuery.startDate) filter['dates.startDate'] = { $gte: new Date(validatedQuery.startDate) };
    if (validatedQuery.endDate) filter['dates.endDate'] = { $lte: new Date(validatedQuery.endDate) };
    if (validatedQuery.minPremium || validatedQuery.maxPremium) {
      filter['financial.premium'] = {};
      if (validatedQuery.minPremium) filter['financial.premium'].$gte = validatedQuery.minPremium;
      if (validatedQuery.maxPremium) filter['financial.premium'].$lte = validatedQuery.maxPremium;
    }
    
    // Build search query
    if (validatedQuery.search) {
      filter.$or = [
        { policyNumber: { $regex: validatedQuery.search, $options: 'i' } },
        { 'vehicle.brand': { $regex: validatedQuery.search, $options: 'i' } },
        { 'vehicle.model': { $regex: validatedQuery.search, $options: 'i' } },
        { 'vehicle.plateNumber': { $regex: validatedQuery.search, $options: 'i' } }
      ];
    }
    
    // Build sort object
    const sort = {};
    sort[validatedQuery.sortBy] = validatedQuery.sortOrder === 'asc' ? 1 : -1;
    
    // Calculate pagination
    const skip = (validatedQuery.page - 1) * validatedQuery.limit;
    
    // Execute query
    const policies = await Policy.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(validatedQuery.limit)
      .populate('userId', 'name email');
    
    // Get total count for pagination
    const total = await Policy.countDocuments(filter);
    
    // Calculate pagination info
    const totalPages = Math.ceil(total / validatedQuery.limit);
    const hasNextPage = validatedQuery.page < totalPages;
    const hasPrevPage = validatedQuery.page > 1;
    
    res.json({
      policies,
      pagination: {
        currentPage: validatedQuery.page,
        totalPages,
        totalItems: total,
        itemsPerPage: validatedQuery.limit,
        hasNextPage,
        hasPrevPage
      }
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      });
    }
    
    res.status(500).json({
      error: 'Failed to fetch policies',
      message: error.message,
      code: 'POLICIES_FETCH_FAILED'
    });
  }
});

// GET /api/policies/:id - Get specific policy by ID
router.get('/:id', verifyAccessToken, async (req, res) => {
  try {
    const policy = await Policy.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('userId', 'name email');
    
    if (!policy) {
      return res.status(404).json({
        error: 'Policy not found',
        code: 'POLICY_NOT_FOUND'
      });
    }
    
    res.json(policy);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch policy',
      message: error.message,
      code: 'POLICY_FETCH_FAILED'
    });
  }
});

// POST /api/policies - Create new policy
router.post('/', verifyAccessToken, async (req, res) => {
  try {
    // Validate input data
    const validatedData = createPolicySchema.parse(req.body);
    
    // Calculate total amount
    const totalAmount = calculateTotalAmount(
      validatedData.financial.premium,
      validatedData.financial.franchise,
      validatedData.financial.taxes
    );
    
    // Create new policy
    const newPolicy = new Policy({
      ...validatedData,
      userId: req.user._id,
      financial: {
        ...validatedData.financial,
        totalAmount
      }
    });
    
    await newPolicy.save();
    
    // Populate user info
    await newPolicy.populate('userId', 'name email');
    
    res.status(201).json({
      message: 'Policy created successfully',
      policy: newPolicy
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      });
    }
    
    res.status(500).json({
      error: 'Failed to create policy',
      message: error.message,
      code: 'POLICY_CREATION_FAILED'
    });
  }
});

// PUT /api/policies/:id - Update policy
router.put('/:id', verifyAccessToken, async (req, res) => {
  try {
    // Validate input data
    const validatedData = updatePolicySchema.parse(req.body);
    
    // Check if policy exists and belongs to user
    const existingPolicy = await Policy.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!existingPolicy) {
      return res.status(404).json({
        error: 'Policy not found',
        code: 'POLICY_NOT_FOUND'
      });
    }
    
    // Recalculate total amount if financial data changed
    if (validatedData.financial) {
      const premium = validatedData.financial.premium ?? existingPolicy.financial.premium;
      const franchise = validatedData.financial.franchise ?? existingPolicy.financial.franchise;
      const taxes = validatedData.financial.taxes ?? existingPolicy.financial.taxes;
      
      validatedData.financial.totalAmount = calculateTotalAmount(premium, franchise, taxes);
    }
    
    // Update policy
    const updatedPolicy = await Policy.findByIdAndUpdate(
      req.params.id,
      { $set: validatedData },
      { new: true, runValidators: true }
    ).populate('userId', 'name email');
    
    res.json({
      message: 'Policy updated successfully',
      policy: updatedPolicy
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      });
    }
    
    res.status(500).json({
      error: 'Failed to update policy',
      message: error.message,
      code: 'POLICY_UPDATE_FAILED'
    });
  }
});

// DELETE /api/policies/:id - Delete policy
router.delete('/:id', verifyAccessToken, async (req, res) => {
  try {
    // Check if policy exists and belongs to user
    const policy = await Policy.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!policy) {
      return res.status(404).json({
        error: 'Policy not found',
        code: 'POLICY_NOT_FOUND'
      });
    }
    
    // Check if policy can be deleted (not active)
    if (policy.status === 'Active') {
      return res.status(400).json({
        error: 'Cannot delete active policy. Please cancel it first.',
        code: 'ACTIVE_POLICY_DELETE_FORBIDDEN'
      });
    }
    
    await Policy.findByIdAndDelete(req.params.id);
    
    res.json({
      message: 'Policy deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete policy',
      message: error.message,
      code: 'POLICY_DELETION_FAILED'
    });
  }
});

// POST /api/policies/:id/renew - Renew policy
router.post('/:id/renew', verifyAccessToken, async (req, res) => {
  try {
    // Validate input data
    const validatedData = policyRenewalSchema.parse(req.body);
    
    // Check if policy exists and belongs to user
    const existingPolicy = await Policy.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!existingPolicy) {
      return res.status(404).json({
        error: 'Policy not found',
        code: 'POLICY_NOT_FOUND'
      });
    }
    
    // Check if policy is eligible for renewal
    if (existingPolicy.status !== 'Active' && existingPolicy.status !== 'Expired') {
      return res.status(400).json({
        error: 'Policy is not eligible for renewal',
        code: 'POLICY_RENEWAL_NOT_ELIGIBLE'
      });
    }
    
    // Create renewal policy
    const renewalPolicy = new Policy({
      type: existingPolicy.type,
      userId: req.user._id,
      vehicle: existingPolicy.vehicle,
      coverage: existingPolicy.coverage,
      dates: {
        startDate: existingPolicy.dates.endDate,
        endDate: new Date(validatedData.renewalDate),
        renewalDate: new Date(validatedData.renewalDate)
      },
      financial: {
        premium: validatedData.newPremium,
        franchise: validatedData.newFranchise,
        taxes: existingPolicy.financial.taxes,
        totalAmount: calculateTotalAmount(validatedData.newPremium, validatedData.newFranchise, existingPolicy.financial.taxes)
      },
      status: 'Pending',
      notes: `Renewal of policy ${existingPolicy.policyNumber}. ${validatedData.notes || ''}`.trim()
    });
    
    // Apply coverage changes if specified
    if (validatedData.coverageChanges) {
      if (validatedData.coverageChanges.add) {
        validatedData.coverageChanges.add.forEach(coverage => {
          if (renewalPolicy.coverage.hasOwnProperty(coverage)) {
            renewalPolicy.coverage[coverage] = true;
          }
        });
      }
      
      if (validatedData.coverageChanges.remove) {
        validatedData.coverageChanges.remove.forEach(coverage => {
          if (renewalPolicy.coverage.hasOwnProperty(coverage) && coverage !== 'rcObligatoire') {
            renewalPolicy.coverage[coverage] = false;
          }
        });
      }
    }
    
    await renewalPolicy.save();
    
    // Update original policy status
    await Policy.findByIdAndUpdate(req.params.id, {
      status: 'Expired',
      notes: `Renewed by policy ${renewalPolicy.policyNumber}`
    });
    
    // Populate user info
    await renewalPolicy.populate('userId', 'name email');
    
    res.status(201).json({
      message: 'Policy renewed successfully',
      policy: renewalPolicy
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      });
    }
    
    res.status(500).json({
      error: 'Failed to renew policy',
      message: error.message,
      code: 'POLICY_RENEWAL_FAILED'
    });
  }
});

// POST /api/policies/:id/cancel - Cancel policy
router.post('/:id/cancel', verifyAccessToken, async (req, res) => {
  try {
    // Check if policy exists and belongs to user
    const policy = await Policy.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!policy) {
      return res.status(404).json({
        error: 'Policy not found',
        code: 'POLICY_NOT_FOUND'
      });
    }
    
    // Check if policy can be cancelled
    if (policy.status === 'Cancelled' || policy.status === 'Expired') {
      return res.status(400).json({
        error: 'Policy cannot be cancelled',
        code: 'POLICY_CANCELLATION_NOT_ALLOWED'
      });
    }
    
    // Update policy status
    const updatedPolicy = await Policy.findByIdAndUpdate(
      req.params.id,
      {
        status: 'Cancelled',
        notes: `${policy.notes || ''}\nCancelled on ${new Date().toISOString()}`.trim()
      },
      { new: true }
    ).populate('userId', 'name email');
    
    res.json({
      message: 'Policy cancelled successfully',
      policy: updatedPolicy
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to cancel policy',
      message: error.message,
      code: 'POLICY_CANCELLATION_FAILED'
    });
  }
});

// GET /api/policies/stats/summary - Get policy statistics
router.get('/stats/summary', verifyAccessToken, async (req, res) => {
  try {
    const stats = await Policy.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: null,
          totalPolicies: { $sum: 1 },
          activePolicies: {
            $sum: { $cond: [{ $eq: ['$status', 'Active'] }, 1, 0] }
          },
          totalPremium: { $sum: '$financial.premium' },
          totalFranchise: { $sum: '$financial.franchise' },
          policiesByType: {
            $push: {
              type: '$type',
              status: '$status',
              premium: '$financial.premium'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalPolicies: 1,
          activePolicies: 1,
          totalPremium: 1,
          totalFranchise: 1,
          policiesByType: 1,
          averagePremium: { $divide: ['$totalPremium', '$totalPolicies'] }
        }
      }
    ]);
    
    // Process type breakdown
    const typeBreakdown = {};
    if (stats[0] && stats[0].policiesByType) {
      stats[0].policiesByType.forEach(policy => {
        if (!typeBreakdown[policy.type]) {
          typeBreakdown[policy.type] = { count: 0, totalPremium: 0 };
        }
        typeBreakdown[policy.type].count++;
        typeBreakdown[policy.type].totalPremium += policy.premium;
      });
    }
    
    const summary = {
      totalPolicies: stats[0]?.totalPolicies || 0,
      activePolicies: stats[0]?.activePolicies || 0,
      totalPremium: stats[0]?.totalPremium || 0,
      totalFranchise: stats[0]?.totalFranchise || 0,
      averagePremium: stats[0]?.averagePremium || 0,
      typeBreakdown
    };
    
    res.json(summary);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch policy statistics',
      message: error.message,
      code: 'POLICY_STATS_FETCH_FAILED'
    });
  }
});

module.exports = router;
