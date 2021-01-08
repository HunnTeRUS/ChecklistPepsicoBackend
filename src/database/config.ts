import { load } from 'ts-dotenv';

const env = load({
    MONGO:String,
    ENCRYPT_PASSWORD: String,
    SECRET: String,
    TOKEN_LIFE: String,
    EMAIL: String,
    EMAIL_PASS: String
});

const db = {
    uri: `${env.MONGO}`
}

const security = {
    secret: `${env.SECRET}`,
    encrypt: `${env.ENCRYPT_PASSWORD}`,
    tokenLife:`${env.TOKEN_LIFE}`
}

const email = {
    email: `${env.EMAIL}`,
    emailPass: `${env.EMAIL_PASS}`
}

export default db
export {email,security}
