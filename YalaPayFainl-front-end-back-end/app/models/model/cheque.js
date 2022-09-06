import mongoose from "mongoose";
// import * as buffer from "buffer";
// import * as url from "url";
const Schema = mongoose.Schema;
const chequeSchema = new Schema({

    ChequeNo: {
        type: Number,
        required: [true, 'ChequeNo is a required field'],
    },
    Amount: {
        type: Number,
        required: [true, 'amount is a required field'],
    },
    drawer: {
        type: String,
        required: [true, 'drawer is a required field'],
    },
    bankId: {
        type: Schema.Types.ObjectId,
        ref: 'Bank',
        required: [true, ' id required']
    },
    status: {
        type: String,
        required: [true, ' status is a required field'],
    },

    receivedDate: {
        type: Date,
        required: [true, '"receivedDate" is a required field'],
    },
    DueDate: {
        type: Date,
        required: [true, 'dueDate is a required field'],
    },
    chequeImageUri: {
        type: String,
     },


})

export default mongoose.model('Cheque',chequeSchema)
