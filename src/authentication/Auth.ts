import {UserLoginInterface} from "../interfaces/UserInterface";
import {security} from '../database/config'
import { Response, Request, NextFunction } from "express";
import User from "../models/User";

const jwt = require("jsonwebtoken");

export default function generateToken(user : UserLoginInterface) {
    return jwt.sign(user, security.secret, {
        expiresIn: security.tokenLife
    });
}

export async function verifyToken(request : Request, response: Response, next: NextFunction) {
    const token = request.body.token || request.query.token  || request.headers['x-access-token'] || request.headers['x-auth-token'] || request.headers['token']

    if (token) {
        jwt.verify(token, security.secret, function(err:any, decoded:any) {
            if (err) {
                console.log(err)
                return response.status(401).json({ error: "Access Denied. Invalid token." });
            }
            (<any>request).decoded = decoded;
            next();
        });
    } else {
        console.log('Error 403: Access Denied - No token provided')
        return response.status(403).send({
            error: 'Unauthorized access. No token provided.',
        });
    }
} 
