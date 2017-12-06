const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');



// User schema
// Specify input fields we need.
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


// Password encryption
// On save hook (before saving the user model), encrypt password:
userSchema.pre('save', function(next) {
    const user = this; // userSchema

    // Generate salt for password encryption:
    bcrypt.genSalt(10, (error, salt) => {
        // In case of an error:
        if (error) return next(error);


        // Otherwise, encrypt / hash the password:
        bcrypt.hash(user.password, salt, null, (error, hash) => {
            // In case of an error:
            if (error) return next(error);

            // Otherwise, encrypt / hash the password:
            user.password = hash;

            // Proceed to save the user model:
            next();
        });

    });

});



// Compare encrypted passwords
userSchema.methods.comparePassword = function(candidatePassword, callback) {

    bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
        
        // In caswe of an error, return callback with error:
        if (error) return callback(error);

        // Otherwise, verify passwords are matched:
        callback(null, isMatch);

    });

} 



// Create user model
const model = mongoose.model('user', userSchema);

module.exports = model;