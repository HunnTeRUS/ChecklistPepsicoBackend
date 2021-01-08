const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const ChecklistsCarriageSchema = mongoose.Schema({
    checklists: [
        {
            userId: String,
            date: Date,
            driverCPF: String,
            driverName: String,
            coDriverCPF: String,
            coDriverName: String,
            truckPlate: String,
            currentUnit: String,
            carriageInfos: {
                gloves: Boolean,
                vest: Boolean,
                helmet: Boolean,
                truckOk: Boolean,
                chock: Boolean,
                mask: Boolean,
                safetyShoes: Boolean,
                withoutAdornments: Boolean,
            },
            observations: String,
            infringementExplanation: String,
        }
    ]
    
});

export default mongoose.model('ChecklistsCarriage', ChecklistsCarriageSchema);
