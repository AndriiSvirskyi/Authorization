    const mongoose = require('mongoose');
    const bcrypt = require('bcrypt');


    const { Schema } = mongoose;

    // Model user
    const userSchema = new Schema({
        email: {
            type: String,
            unique: true,
            lowercase: true
        },
        password: String
    });

    // encrypt password
    userSchema.pre('save', async function(next) {
        try {
            const user = this;
            const salt = await bcrypt.genSalt(12);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            next();
        } catch(err) {
            next(err);
        }
    });

    // compare data
    userSchema.methods.comparePassword = function(candidatePassword = '') {
        return new Promise(async (resolve, reject) => {
            try {
            const appropriate = await bcrypt.compare(candidatePassword, this.password);

            resolve(appropriate);
            } catch(err) {
            reject(err);
            }
        });
    }

    module.exports = mongoose.model('user', userSchema);
