import { Response, Request } from "express";
import User from '../models/User'
import {encrypt, decrypt} from '../utils/EncodeDecode'
import generateToken from '../authentication/Auth' 
import UserInterface, { UserLoginInterface } from "../interfaces/UserInterface";
import {userLoginInterfaceToJson} from '../utils/userUtils'
import Mailer from "../utils/mailer";

export = {
    async createUser(request : Request, response: Response) {
        const UserDTO = request.body;

        const validationEmail = await User.findOne({ "email": UserDTO.email });

        if (validationEmail) {
            return response.status(400).json({ error: 'Já existe um usuário cadastrado com este e-mail!' });
        }

        const validationCPF = await User.findOne({ "cpf": UserDTO.cpf });

        if (validationCPF) {
            return response.status(400).json({ error: 'Já existe um usuário cadastrado com este cpf!' });
        }

        const validationRG = await User.findOne({ "rg": UserDTO.rg });

        if (validationRG) {
            return response.status(400).json({ error: 'Já existe um usuário cadastrado com este RG!' });
        }

        UserDTO.password = String(encrypt(UserDTO.password));

        const newUser = await User.create(UserDTO);

        newUser.password = null;

        return response.json(newUser);
    },

    async listUsers(request : Request, response: Response) {
        try {
            const user = await User.find({})

            if (user) {
                for (var i = 0; i < user.length; i++) {
                    user[i].password = null;
                }
            }

            return response.status(200).json({ user });
        } catch (e) {
            console.log(e);
            return response.status(400).json({ error: "Não foi possível buscas todos os usuarios, tente novamente mais tarde!" });
        }
    },

    async getUserByName(request : Request, response: Response) {
        const name = request.query.name

        try {
            const user = await User.find({ "name": new RegExp("^" + name) })

            if (user) {
                for (var i = 0; i < user.length; i++) {
                    user[i].password = null;
                }
            }

            return response.status(200).json({ user });
        } catch (e) {
            console.log(e)
            return response.status(400).json({ error: "Não foi possível buscar este usuario!", e });
        }
    },

    async removeUser(request : Request, response: Response) {
        const {_id} = request.query

        try {
            const user = await User.findOne({ "_id": _id })

            if (user) {
                await User.removeOne({ "_id": _id })
                return response.status(200).json();
            }

            else return response.status(404).json({ error: "Nenhum usuario foi encontrado com este ID" });
        } catch (e) {
            console.log(e)
            return response.status(400).json({ error:  e });
        }
    },

    async getUserByEmail(request : Request, response: Response) {
        const email = request.query.email
        try {
            const user = await User.find({ "email": email })

            if (user) {
                for (var i = 0; i < user.length; i++) {
                    user[i].password = null;
                }
            }

            return response.status(200).json({ user });
        } catch (e) {
            console.log(e);
            return response.status(400).json({ error: "Não foi possível buscar este usuario!" });
        }
    },

    async updatePassword(request : Request, response: Response) {
        const { _id, oldPass, newPass } = request.body;
        let current
        try {
            const user = await User.findOne({ "_id": _id });
            if (user) {
                current = String(decrypt(user.password))
                if (current === newPass) {
                    return response.status(200).json();
                }
                if (current === oldPass) {
                    const novaSenhaCrypt = String(encrypt(newPass));
                    await User.updateOne({ "_id": _id }, { "password": novaSenhaCrypt });
                    
                    return response.status(200).json();
                } else {
                    return response.status(400).json({ error: "Senha antiga não está correta!" })
                }
            }
            return response.status(404).json({ error: "Email/senha não encontrado" });
        } catch (e) {
            console.log(e);
            return response.status(400).json({ error: e });
        }
    },

    async loginUser(request : Request, response: Response) {
        const { cpf, password } = request.body;
        const result : UserInterface = await User.findOne({ "cpf": cpf });
        if (result) {
            let pass = decrypt(String(result.password));

            if (pass == password) {
                const userJson = userLoginInterfaceToJson(result);
                const token = generateToken(userJson);
                response.header('x-access-token', token);
                response.json(userJson);
            } else {
                return response.status(400).json({ error: 'E-mail e/ou senha incorretos!' });
            }
        } else {
            return response.status(400).json({ error: 'E-mail e/ou senha incorretos!' });
        }
    },

    async forgotPassword(request : Request, response: Response) {
        const { cpf, email } = request.body;
        let code;
        let mailer = new Mailer();

        try {
            const user = await User.findOne({ cpf: cpf, email: email });
            if (user) {
                await mailer.sendNewPasswordCodeByEmail(String(user.email), cpf).catch((error) => {
                    return response.status(400).json({
                        error: error
                    });
                });
                return response.status(200).json({
                    _id: user._id,
                });
            } else {
                return response.status(404).json({ error: "CPF/Email inválido ou não encontrado" });
            }
        } catch (e) {
            console.log(e)
            return response.status(400).json({ error: e });
        }
    },
}