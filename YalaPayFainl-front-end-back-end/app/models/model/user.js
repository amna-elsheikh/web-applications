import mongoose from "mongoose";
const Schema = mongoose.Schema;
const loginSchema = new Schema({
    email: {
        type: String,
        required: [true, ' email is required']
    },
    password: {
        type: String,
        required: [true, ' password is required']
    },
    firstName: { type: String,
    required: [true]
    },
    lastName: {
        type: String,
        required: [true]
    }
})

export default mongoose.model('User',loginSchema)