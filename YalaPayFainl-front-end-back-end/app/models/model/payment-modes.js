import mongoose from "mongoose";
const Schema = mongoose.Schema;
const paymentModesSchema = new Schema({

    paymentMode: {
        type: String,
        required: [true, 'paymentMode is a required field'],
    }

})

export default mongoose.model('Modes',paymentModesSchema)