import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bankSchema = new Schema({

    bankName: {
        type: String,
        required: [true, 'bankName is a required field'],
    }

})

export default mongoose.model('Bank',bankSchema)
