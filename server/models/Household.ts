import mongoose, { Document, Schema } from 'mongoose'

export interface IHousehold extends Document {
  _id: mongoose.Types.ObjectId
  houseCode: string
  firstName: string
  lastName: string
  address: string
  houseUsage: number
  isActive: number
  status: string
  createdAt: Date
  updatedAt: Date
  fullName: string
}

const HouseholdSchema = new Schema<IHousehold>({
  houseCode: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [50, 'First name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: [50, 'Last name cannot be more than 50 characters']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    minlength: [10, 'Address must be at least 10 characters'],
    maxlength: [200, 'Address cannot be more than 200 characters']
  },
  houseUsage: {
    type: Number,
    required: [true, 'House usage is required'],
    min: [0, 'House usage cannot be negative'],
    max: [999999, 'House usage cannot exceed 999,999 units']
  },
  isActive: {
    type: Number,
    enum: [0, 1],
    default: 1
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'suspended'],
    default: 'active'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  },
  toObject: { virtuals: true }
})

// Indexes for efficient queries
HouseholdSchema.index({ firstName: 1, lastName: 1 })
HouseholdSchema.index({ status: 1, isActive: 1 })
HouseholdSchema.index({ createdAt: -1 })
HouseholdSchema.index({ firstName: 'text', lastName: 'text', address: 'text' })

// Virtual for full name
HouseholdSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`
})

export default mongoose.models.Household || mongoose.model<IHousehold>('Household', HouseholdSchema)