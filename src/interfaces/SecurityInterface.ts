export default interface SecurityInterface {
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
        chock: Boolean,
        mask: Boolean,
        safetyShoes: Boolean,
        withoutAdornments: Boolean,
    },
    observations: String,
    infringementExplanation: String
}

export interface SecurityInterfaceDTO {
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
        chock: Boolean,
        mask: Boolean,
        safetyShoes: Boolean,
        withoutAdornments: Boolean,
    },
    observations: String,
    infringementExplanation: String
}

export interface SecurityInterfacePDF {
    realizedByName: String,
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
        chock: Boolean,
        mask: Boolean,
        safetyShoes: Boolean,
        withoutAdornments: Boolean,
    },
    observations: String,
    infringementExplanation: String
}