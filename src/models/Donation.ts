import mongoose, { Schema, Document } from 'mongoose';
import { PaymentMethod } from './Crowdfund'; // Assuming PaymentMethod is an enum or constants somewhere

export interface Donation extends Document {
  user_id: mongoose.Types.ObjectId; // Change to ObjectId reference
  payment_method: PaymentMethod;
  amount: number;
  bank_name?: string;
  crowdfund_id: mongoose.Types.ObjectId; // Add crowdfund_id reference
  created_at: Date;
}

const DonationSchema: Schema = new Schema(
  {
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', // Reference to the User model
      required: true 
    },
    payment_method: { 
      type: String, 
      enum: [PaymentMethod.QRIS, PaymentMethod.BANK_TRANSFER], 
      required: true 
    },
    amount: { 
      type: Number, 
      required: true 
    },
    bank_name: { 
      type: String, 
      required: function(this: any) { 
        return this.payment_method === PaymentMethod.BANK_TRANSFER; 
      } 
    },
    crowdfund_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Crowdfund', // Reference to the Crowdfund model
      required: true 
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

export default mongoose.model<Donation>('Donation', DonationSchema);
