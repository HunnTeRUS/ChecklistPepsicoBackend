const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const CompanySchema = mongoose.Schema({
    name: String,
    units: [
        {
            name: String,
            streetName: String,
            number: String,
            cep: String,
            state: String,
            city: String,
        }
    ]
});

export default mongoose.model('Company', CompanySchema);
