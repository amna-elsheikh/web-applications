import mongoose from "mongoose";
const Schema = mongoose.Schema;
const customerSchema = new Schema({

    customerId: {
        type: Number,
    },
    companyName: {
        type: String,
    },
    address: {
        street: { type: String },
        city:{ type: String },
        country:{ type: String },

    },
    contactDetails: {
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String},
        mobile: { type: String },
    }

})

export default mongoose.model('Customer',customerSchema)
