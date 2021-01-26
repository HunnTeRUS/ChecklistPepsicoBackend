const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const ChecklistsCarriageSchema = mongoose.Schema({
    userId: String,
    date: Date,
    driverCPF: String,
    driverName: String,
    coDriverCPF: String,
    realizedBy: String,
    coDriverName: String,
    truckPlate: String,
    currentUnit: String,
    carriageInfos: {
        gloves: Boolean,
        vest: Boolean,
        chock: Boolean,
        mask: Boolean,
        safetyShoes: Boolean,
        withoutAdornments: Boolean,
    },
    observations: String,
    infringementExplanation: String,
    pdfPath: String,
});

export default mongoose.model('ChecklistsCarriage', ChecklistsCarriageSchema);
