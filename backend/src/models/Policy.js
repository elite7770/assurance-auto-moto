const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  policyNumber: {
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
  type: {
    type: String,
    enum: ['Auto', 'Moto', 'Commercial', 'Home'],
    required: true
  },
  vehicle: {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    plateNumber: { type: String, required: true, uppercase: true },
    vin: { type: String, unique: true, sparse: true },
    engineSize: { type: String },
    fuelType: { type: String, enum: ['Essence', 'Diesel', 'Électrique', 'Hybride'] }
  },
  coverage: {
    rcObligatoire: { type: Boolean, default: true },
    vol: { type: Boolean, default: false },
    incendie: { type: Boolean, default: false },
    brisGlace: { type: Boolean, default: false },
    assistance: { type: Boolean, default: false },
    defense: { type: Boolean, default: false },
    dommagesCollision: { type: Boolean, default: false },
    protectionConducteur: { type: Boolean, default: false }
  },
  dates: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    renewalDate: { type: Date, required: true }
  },
  financial: {
    premium: { type: Number, required: true, min: 0 },
    franchise: { type: Number, required: true, min: 0 },
    taxes: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true }
  },
  status: {
    type: String,
    enum: ['Draft', 'Pending', 'Active', 'Suspended', 'Expired', 'Cancelled'],
    default: 'Draft'
  },
  documents: [{
    type: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
  }],
  notes: String,
  agent: {
    name: String,
    email: String,
    phone: String
  }
}, {
  timestamps: true
});

// Indexes for better performance
policySchema.index({ userId: 1, status: 1 });
policySchema.index({ policyNumber: 1 });
policySchema.index({ 'vehicle.plateNumber': 1 });
policySchema.index({ 'dates.endDate': 1 });

// Virtual for policy duration
policySchema.virtual('duration').get(function() {
  return Math.ceil((this.dates.endDate - this.dates.startDate) / (1000 * 60 * 60 * 24));
});

// Virtual for days until renewal
policySchema.virtual('daysUntilRenewal').get(function() {
  return Math.ceil((this.dates.renewalDate - new Date()) / (1000 * 60 * 60 * 24));
});

// Pre-save middleware to generate policy number
policySchema.pre('save', function(next) {
  if (this.isNew && !this.policyNumber) {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.policyNumber = `POL${year}${random}`;
  }
  next();
});

module.exports = mongoose.model('Policy', policySchema);
