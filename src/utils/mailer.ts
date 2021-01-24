import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { email as emailConfig } from '../database/config';
import User from '../models/User';
import { encrypt } from './EncodeDecode';

export default class Mailer {
  async gerarPassword() {
    let total;
    do {
      total = Math.floor(Math.random() * 1000000);
    } while (total < 100000 || total > 1000000);
    return total.toString();
  }

  readHTMLFile = function (path: string, callback: any) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
      if (err) {
        throw err;
        callback(err);
      } else {
        callback(null, html);
      }
    });
  };

  async sendNewPasswordCodeByEmail(email: string, cpf: string) {
    const code = await this.gerarPassword();
    const novaSenhaCrypt = String(encrypt(code));
    await User.updateOne({ "cpf": cpf }, { "password": novaSenhaCrypt });
    
    const remetente = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: emailConfig.email as string,
        pass: emailConfig.emailPass as string,
      },
    });

    this.readHTMLFile(
      'src/templates/emails/forgotPassword/forgotPass.html',
      function (err: any, html: any) {
        const template = handlebars.compile(html);
        const replacements = {
          code: code,
        };
        const htmlToSend = template(replacements);
        const mailOptions = {
          from: emailConfig.email as string,//String(process.env.EMAIL),
          to: email,
          subject: 'Alteração de senha',
          html: htmlToSend,
        };
        remetente.sendMail(mailOptions, function (error, response) {
          if (error) {
            console.log(error);
          }
        });
      }
    );
  }
}
