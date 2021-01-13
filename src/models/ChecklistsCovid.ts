const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const ChecklistsCovidSchema = mongoose.Schema({
    date: Date,
    realizedBy: String,
    personName: String,
    personCPF: String,
    hadContactWithSomeoneInfected: Boolean,
    hadSymptoms: Boolean,
    isCarryingAlcoholAndMask: Boolean,
    unity: String,
    pdfPath: String,
});

export default mongoose.model('ChecklistsCovid', ChecklistsCovidSchema);
