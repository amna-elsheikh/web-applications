import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ReturnReasonsSchema = new Schema({

    returnedReasons: {
        type: String,
        required: [true, 'returnedReasons is a required field'],
    }

})

export default mongoose.model('returnReasons',ReturnReasonsSchema)