export default interface UserInterface {
    _id: String,
    cpf: String,
    rg: String,
    name: String,
    shipping: String,
    email: String,
    password: String,
}

export interface UserLoginInterface {
    _id: String,
    cpf: String,
    rg: String,
    name: String,
    shipping: String,
    email: String,
}

export interface UserLoginInterfaceRegister {
    cpf: String,
    rg: String,
    name: String,
    shipping: String,
    email: String,
}