import { Response, Request } from "express";
import htmlPdf from 'html-pdf'
import fs from 'fs';
import handlebars from 'handlebars';
import html5pdf from 'html5-to-pdf'
import puppeteer from 'puppeteer'
import { CheckCovidInterfaceDTO } from '../interfaces/ChecklistCovid';
import { SecurityInterfaceDTO } from "../interfaces/SecurityInterface";

export default async function createPdf(
    replacements: CheckCovidInterfaceDTO | SecurityInterfaceDTO, 
    htmlPath: string, 
    archieveName: string) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        readHTMLFile(`${htmlPath}`, async function (err: any, html: any) {  
            if(err) {
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

            await browser.close();
        })
        return `./${archieveName}.pdf`
    } catch (e) {
        console.log(e)
    }
}

function readHTMLFile(path: string, callback: any) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            console.log(err)
            return;
        } else {
            callback(null, html);
        }
    });
};