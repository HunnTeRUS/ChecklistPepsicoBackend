import UserInterface from "../interfaces/UserInterface";

const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
    cpf: String,
    rg: String,
    name: String,
    shipping: String,
    email: String,
    password: String,
});

UserSchema.methods = {
    generateToken(user : UserInterface) {
        return jwt.sign(user, process.env.SECRET, {
            expiresIn: 86400
        });
    }
};

export default mongoose.model('User', UserSchema);