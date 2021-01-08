import { load } from "ts-dotenv";

export const env = load({
    MONGO:String,
    ENCRYPT_PASSWORD: String,
    SECRET: String,
    TOKEN_LIFE: String,
    EMAIL: String,
    PORT: String,
    EMAIL_PASS: String
});