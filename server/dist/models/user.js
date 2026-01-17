import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true
        }]
}, {
    timestamps: true
});
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=user.js.map