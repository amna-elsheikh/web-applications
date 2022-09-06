import mongoose from "mongoose";
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
    paymentId: {
        type: Number,
    },
    InvoiceID: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice',

    },
    Amount: {
        type: Number,
    },
    PaymentDate: {
        type: Date,
    },
    PaymentMode: {
        type: String,
    },
    PaymentModeId: {
        type: Schema.Types.ObjectId,
        ref: 'Modes',
    },
    ChequeId: {
        type: Schema.Types.ObjectId,
        ref: 'Cheque',
    }

})

export default mongoose.model('Payment',paymentSchema)
