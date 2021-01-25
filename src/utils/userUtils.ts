import { UserLoginInterface } from './../interfaces/UserInterface';
import UserInterface from "../interfaces/UserInterface";

export default function userInterfaceToJson(user: UserInterface) {
    return {
        cpf: user.cpf,
        rg: user.rg,
        name: user.name,
        shipping: user.shipping,
        email: user.email,
        password: user.password,
    }
}

export function userLoginInterfaceToJson(user: UserInterface) {
    return {
        _id: user._id,
        cpf: user.cpf,
        rg: user.rg,
        name: user.name,
        shipping: user.shipping,
        email: user.email,
    }
}