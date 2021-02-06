import fs from 'fs';
import handlebars from 'handlebars';
import puppeteer from 'puppeteer'
import { CheckCovidInterfaceDTO } from '../interfaces/ChecklistCovid';
import { SecurityInterfaceDTO } from "../interfaces/SecurityInterface";
import AWS from 'aws-sdk'
import { PutObjectRequest } from "aws-sdk/clients/s3";
import {s3} from '../database/config'

export default async function createPdf(
    replacements: CheckCovidInterfaceDTO | SecurityInterfaceDTO,
    htmlPath: string,
    archieveName: string) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const linkPdfAWS = await readHTMLFile(`${htmlPath}`, async function (err: any, html: any) {
            if (err) {
                return;
            }

            var template = handlebars.compile(html);
            var htmlToSend = template(replacements);
            await page.setContent(htmlToSend)
            await page.pdf({
                path: `./${archieveName}.pdf`,
                format: 'A4',
                width: 800,
                displayHeaderFooter: false,
                printBackground: true
            })
            
            return await uploadFileIntoS3Bucket(`./${archieveName}.pdf`, archieveName)
        })        

        fs.unlinkSync(`./${archieveName}.pdf`)

        return linkPdfAWS
    } catch (e) {
        console.log(e)
    }
}

async function readHTMLFile(path: string, callback: any) {
    return await new Promise( r => fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            console.log(err)
            return null;
        } else {
            r(callback(null, html))
        }
    }))
};

async function uploadFileIntoS3Bucket(file: string, fileName: String) {


    const fileContent = fs.readFileSync(file);

    let s3Bucket = new AWS.S3({
        accessKeyId: String(s3.IAM_USER_KEY),
        secretAccessKey: String(s3.IAM_USER_SECRET),
    })

    const params: PutObjectRequest = {
        Bucket: String(s3.BUCKET_NAME),
        Key: String(fileName + ".pdf"), // File name you want to save as in S3
        Body: fileContent,
    };

    return await new Promise( r =>
        s3Bucket.upload(params, function (err, data) {
            if (err) {
                throw err;
            }

            r(data.Location as String)
        })
    )
}

