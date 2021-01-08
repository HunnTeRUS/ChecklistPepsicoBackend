var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
import {email} from '../database/config'

require('dotenv').config('../../../.env');

function gerarPassword() {
    let total
    do {
        total = Math.floor(Math.random() * 1000000)
    } while (total < 100000 || total > 1000000)
    return total.toString()
        //return Math.random().toString(36).slice(-10);
}

var remetente = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: String(email.email),
        pass: String(email.emailPass)
    }
});

var readHTMLFile = function(path: string, callback: any) {
    fs.readFile(path, { encoding: 'utf-8' }, function(err: any, html: any) {
        if (err) {
            throw err;
        } else {
            callback(null, html);
        }
    });
};

export default function sendNewPasswordCodeByEmail(email: string, local: number) {
    var code = gerarPassword();
    const caminho = ['src/templates/emails/forgotPassword/forgotPass.html', 'src/templates/emails/forgotPassword/emailValidator.html']
    const assunto = ['Código para atualização de senha', 'Código para validação de cadastro']
    readHTMLFile(caminho[local], function(err: any, html: any) {
        var template = handlebars.compile(html);
        var replacements = {
            code: code
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: String(process.env.EMAIL),
            to: email,
            subject: assunto[local],
            html: htmlToSend
        };
        remetente.sendMail(mailOptions, function(error: any, response: any) {
            if (error) {
                console.log(error);
            }
        });
    });

    return code;
}
