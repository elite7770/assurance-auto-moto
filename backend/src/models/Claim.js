const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  claimNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  policyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Policy',
    required: true
  },
  type: {
    type: String,
    enum: ['Accident', 'Vol', 'Dégâts', 'Incendie', 'Bris de glace', 'Assistance', 'Autre'],
    required: true
  },
  incident: {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },
    description: { type: String, required: true, maxlength: 2000 },
    witnesses: [{
      name: String,
      phone: String,
      statement: String
    }]
  },
  damages: {
    estimatedAmount: { type: Number, required: true, min: 0 },
    actualAmount: { type: Number, min: 0 },
    currency: { type: String, default: 'MAD' },
    details: [{
      item: { type: String, required: true },
      description: String,
      estimatedCost: { type: Number, required: true },
      actualCost: { type: Number },
      status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Completed'], default: 'Pending' }
    }]
  },
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Under Review', 'Investigation', 'Approved', 'Rejected', 'Closed', 'Reopened'],
    default: 'Draft'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  timeline: [{
    date: { type: Date, default: Date.now },
    status: { type: String, required: true },
    description: { type: String, required: true },
    updatedBy: { type: String, required: true }, // 'user' or 'agent'
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    internal: { type: Boolean, default: false } // Internal notes not shown to user
  }],
  documents: [{
    type: { type: String, required: true }, // 'photo', 'police_report', 'medical_report', 'estimate', 'other'
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    mimeType: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    uploadedBy: { type: String, default: 'user' }, // 'user' or 'agent'
    description: String
  }],
  communication: [{
    type: { type: String, enum: ['email', 'phone', 'sms', 'in_person'], required: true },
    date: { type: Date, default: Date.now },
    direction: { type: String, enum: ['inbound', 'outbound'], required: true },
    summary: { type: String, required: true },
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    internal: { type: Boolean, default: false }
  }],
  settlement: {
    amount: { type: Number, min: 0 },
    currency: { type: String, default: 'MAD' },
    date: Date,
    method: { type: String, enum: ['Bank Transfer', 'Check', 'Cash', 'Credit'] },
    reference: String,
    notes: String
  },
  notes: {
    user: [String], // User notes
    agent: [String], // Agent notes (internal)
    system: [String] // System-generated notes
  },
  assignedAgent: {
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedAt: { type: Date, default: Date.now },
    notes: String
  },
  deadlines: {
    responseRequired: { type: Date }, // When user needs to respond
    investigationDeadline: { type: Date }, // When investigation should be complete
    settlementDeadline: { type: Date } // When settlement should be complete
  }
}, {
  timestamps: true
});

// Indexes for better performance
claimSchema.index({ userId: 1, status: 1 });
claimSchema.index({ claimNumber: 1 });
claimSchema.index({ policyId: 1 });
claimSchema.index({ 'incident.date': 1 });
claimSchema.index({ status: 1, priority: 1 });

// Virtual for claim age in days
claimSchema.virtual('ageInDays').get(function() {
  return Math.ceil((new Date() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for days since last update
claimSchema.virtual('daysSinceLastUpdate').get(function() {
  if (this.timeline && this.timeline.length > 0) {
    const lastUpdate = this.timeline[this.timeline.length - 1].date;
    return Math.ceil((new Date() - lastUpdate) / (1000 * 60 * 60 * 24));
  }
  return this.ageInDays;
});

// Virtual for total documents count
claimSchema.virtual('documentsCount').get(function() {
  return this.documents ? this.documents.length : 0;
});

// Virtual for total communication count
claimSchema.virtual('communicationCount').get(function() {
  return this.communication ? this.communication.length : 0;
});

// Pre-save middleware to generate claim number
claimSchema.pre('save', function(next) {
  if (this.isNew && !this.claimNumber) {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.claimNumber = `CLM${year}${random}`;
  }
  
  // Add initial timeline entry if this is a new claim
  if (this.isNew && (!this.timeline || this.timeline.length === 0)) {
    this.timeline = [{
      date: new Date(),
      status: this.status,
      description: 'Claim created',
      updatedBy: 'user',
      internal: false
    }];
  }
  
  next();
});

// Method to add timeline entry
claimSchema.methods.addTimelineEntry = function(status, description, updatedBy = 'user', agentId = null, internal = false) {
  this.timeline.push({
    date: new Date(),
    status,
    description,
    updatedBy,
    agentId,
    internal
  });
  
  this.status = status;
  return this.save();
};

// Method to add document
claimSchema.methods.addDocument = function(documentData) {
  this.documents.push(documentData);
  return this.save();
};

// Method to add communication
claimSchema.methods.addCommunication = function(communicationData) {
  this.communication.push(communicationData);
  return this.save();
};

// Method to add note
claimSchema.methods.addNote = function(note, type = 'user') {
  if (!this.notes[type]) {
    this.notes[type] = [];
  }
  this.notes[type].push(note);
  return this.save();
};

// Static method to get claims statistics
claimSchema.statics.getStats = async function(userId) {
  return await this.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalClaims: { $sum: 1 },
        claimsByStatus: {
          $push: {
            status: '$status',
            priority: '$priority',
            estimatedAmount: '$damages.estimatedAmount'
          }
        },
        totalEstimatedAmount: { $sum: '$damages.estimatedAmount' },
        totalActualAmount: { $sum: '$damages.actualAmount' }
      }
    },
    {
      $project: {
        _id: 0,
        totalClaims: 1,
        claimsByStatus: 1,
        totalEstimatedAmount: 1,
        totalActualAmount: 1,
        averageEstimatedAmount: { $divide: ['$totalEstimatedAmount', '$totalClaims'] }
      }
    }
  ]);
};

module.exports = mongoose.model('Claim', claimSchema);
