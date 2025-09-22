import mongoose, { Document, Schema } from 'mongoose'

interface IAddress extends Document {
    // address: string
    houseNumber?: string
    province?: string
    subdistrict?: string
    district?: string
    city?: string
    state?: string
    zipCode?: string
    houseHoldId?: string
}

const AddressSchema = new Schema<IAddress>({
    // address: {
    //     type: String,
    //     required: [true, 'Address is required'],
    //     trim: true,
    //     minlength: [10, 'Address must be at least 10 characters'],
    //     maxlength: [200, 'Address cannot be more than 200 characters']
    // },
    houseNumber: {
        type: String,
        required: [true, 'House number is required'],
        trim: true,
        minlength: [2, 'House number must be at least 2 characters'],
        maxlength: [50, 'House number cannot be more than 50 characters']
    },
    province: {
        type: String,
        required: [true, 'Province is required'],
        trim: true,
        minlength: [2, 'Province must be at least 2 characters'],
        maxlength: [50, 'Province cannot be more than 50 characters']
    },
    subdistrict: {
        type: String,
        required: [true, 'Subdistrict is required'],
        trim: true,
        minlength: [2, 'Subdistrict must be at least 2 characters'],
        maxlength: [50, 'Subdistrict cannot be more than 50 characters']
    },
    district: {
        type: String,
        required: [true, 'District is required'],
        trim: true,
        minlength: [2, 'District must be at least 2 characters'],
        maxlength: [50, 'District cannot be more than 50 characters']
    },
    // city: {
    //     type: String,
    //     required: [true, 'City is required'],
    //     trim: true,
    //     minlength: [2, 'City must be at least 2 characters'],
    //     maxlength: [50, 'City cannot be more than 50 characters']
    // },
    // province: {
    //     type: String,
    //     required: [true, 'State is required'],
    //     trim: true,
    //     minlength: [2, 'State must be at least 2 characters'],
    //     maxlength: [50, 'State cannot be more than 50 characters']
    // },
    zipCode: {
        type: String,
        required: [true, 'Zip code is required'],
        trim: true,
        minlength: [2, 'Zip code must be at least 2 characters'],
        maxlength: [50, 'Zip code cannot be more than 50 characters']
    },
    houseHoldId: {
        type: String,
        required: false,
        ref: 'Household'
    }
}, { timestamps: true })

export default mongoose.models.Address || mongoose.model<IAddress>('Address', AddressSchema);



