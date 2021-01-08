const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const ChecklistsCovidSchema = mongoose.Schema({
    checklists: [
        {
            userId: String,
            date: Date,
            personRG: String,
            personCPF: String,
            hadContactWithSomeoneInfected: Boolean,
            hadSymptoms: Boolean,
            isCarryingAlcoholAndMask: Boolean
        }
    ]
    
});

export default mongoose.model('ChecklistsCovid', ChecklistsCovidSchema);
