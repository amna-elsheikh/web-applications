import mongoose from "mongoose";
const Schema = mongoose.Schema;
const depositSchema = new Schema({
    depositId: {
        type: Number,
    },
    depositDate: {
        type: Date,
    },
    bankAccountNo: {
        type: Schema.Types.ObjectId,
        ref: 'bankAccount',
    },
    depositStatus: {
        type: String,

    },
    chequeNos: [{
        type: String,

    }],
    returnedReasons: {
        type: Schema.Types.ObjectId,
        ref: 'returnReasons',

    }



})

export default mongoose.model('deposit',depositSchema)
