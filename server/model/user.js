import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Removes any extra spaces from the name
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3, // Minimum length for username
        maxlength: 50 // Maximum length for username
    },
    password: {
        type: String,
        required: true,
        minlength: 8 // Enforce a minimum password length
    }
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

// Use a capitalized name for the model to follow conventions
const User = mongoose.model('User', userSchema);

export default User;