const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const CompanySchema = mongoose.Schema({
    employeesServed: [
        {
            name: String,
            cpf: String,
        }
    ],
    carriers: [
        {
            name: String,
            units: [
                {
                    name: String,
                    streetName: String,
                    cep: String,
                    state: String,
                    city: String,
                }
            ]
        }
    ]
});

export default mongoose.model('Company', CompanySchema);
