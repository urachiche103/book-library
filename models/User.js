const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        // name: { type: String, required: true },
        // lastName: { type: String, required: true }, 
        // phoneNumber:{ type: String }
    },
    {
        timestamps: true,
    }
    );

const User = mongoose.model('User', userSchema);

module.exports = User;