const {Schema, model} = require('mongoose');
const crypto = require('crypto');

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
        required: true,
    },
    passwordHashed: {
        type: String,
        required: true,
    },
    contactPhone: {
        type: String,
        required: false,
        default: '',
    }
});

userSchema.methods.setPassword = function(password) {
    // Creating a unique salt for a particular user
    this.salt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password with 1000 iterations,

    this.passwordHashed = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, 'sha256').toString('hex');
};

// Method to check the entered password is correct or not
userSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha256').toString('hex');
    return this.passwordHashed === hash;
};

module.exports = model('User', userSchema);