import mongoose from "mongoose";
const Schema = mongoose.Schema;
const invoiceSchema = new Schema({
    InvoiceNo: {
            type: Number,
            // required: [true, 'invoiceId is a required field'],
        },
    CustomerID: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        // required: [true, ' id required']
    },

    Amount: {
        type: Number,
        // required: [true, 'Number is a required field'],
    },

    InvoiceDate: {
        type: Date,
        // required: [true, 'InvoiceDate is a required field'],
    },
    DueDate: {
        type: Date,
        // required: [true, 'DueDate is a required field'],
    }

})

export default mongoose.model('Invoice',invoiceSchema)
