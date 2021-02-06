import { load } from 'ts-dotenv';

const env = load({
    MONGO:String,
    ENCRYPT_PASSWORD: String,
    SECRET: String,
    TOKEN_LIFE: String,
    EMAIL: String,
    EMAIL_PASS: String,
    BUCKET_NAME: String, 
    IAM_USER_KEY: String,
    IAM_USER_SECRET: String,
});

const db = {
    uri: `${env.MONGO}`
}

const s3 = {
    BUCKET_NAME: `${env.BUCKET_NAME}`, 
    IAM_USER_KEY: `${env.IAM_USER_KEY}`,
    IAM_USER_SECRET: `${env.IAM_USER_SECRET}`,
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
export {email,security, s3}
