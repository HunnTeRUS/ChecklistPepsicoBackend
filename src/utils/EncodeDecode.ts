import crypto from 'crypto'
import {security} from '../database/config'

const algorithm : string = 'aes-256-ctr';
const pass : string = security.encrypt.toString()

export function encrypt(text : string) {
    var cipher  = crypto.createCipher(algorithm, pass)
    var crypted = cipher.update(text.toString(), 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

export function decrypt(text : string) {
    var decipher = crypto.createDecipher(algorithm, pass)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}