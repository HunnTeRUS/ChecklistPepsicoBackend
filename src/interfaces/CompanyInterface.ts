export default interface CompanyInterface {
    _id: String,
    name: String,
    units: [
        {
            _id: String,
            name: String,
            streetName: String,
            cep: String,
            state: String,
            city: String,
        }
    ]
}               

export interface UnitInterface {
    name: String,
    streetName: String,
    cep: String,
    state: String,
    city: String,
}

export interface UnitInterfaceModel {
    _id: String,
    name: String,
    streetName: String,
    cep: String,
    state: String,
    city: String,
}

export interface CompanyCarrierInterfaceDTO {
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