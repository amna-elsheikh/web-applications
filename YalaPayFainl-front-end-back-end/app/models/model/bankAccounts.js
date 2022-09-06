import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bankAccountsSchema = new Schema({

    accountNo: {
    type: String,
        required: [true, 'Name is a required field'],
},
    bankId: {
    type: Schema.Types.ObjectId,
    ref: 'Bank',
        required: [true, ' id required']
}

})

export default mongoose.model('bankAccount',bankAccountsSchema)
