export default interface CheckCovidInterface {
    _id: String,
    personName: String,
    personCPF: String,
    date: Date,
    realizedBy: String,
    unity: String,
    hadContactWithSomeoneInfected: Boolean,
    hadSymptoms: Boolean,
    isCarryingAlcoholAndMask: Boolean,
    pdfPath: String,
}

export interface CheckCovidInterfaceDTO {
    personName: String,
    personCPF: String,
    date: Date,
    realizedBy: String,
    unity: String,
    hadContactWithSomeoneInfected: Boolean,
    hadSymptoms: Boolean,
    isCarryingAlcoholAndMask: Boolean,
    pdfPath: String,
}

export interface DBInterface {
    _id: String,
    checklists: Array<CheckCovidInterface>,
}
