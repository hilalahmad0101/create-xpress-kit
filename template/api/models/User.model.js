import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        required: true,
        type: String,
        trim: true,
    }
}, { timestamps: true }); // This adds createdAt and updatedAt fields

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
