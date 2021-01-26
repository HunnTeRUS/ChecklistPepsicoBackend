import { DBInterface } from './../interfaces/ChecklistCovid';
import { Response, Request } from "express";
import CheckCovidInterface, { CheckCovidInterfaceDTO } from "../interfaces/ChecklistCovid";
import createPdf from '../utils/GeneratePDF'
import User from '../models/User'
import ChecklistsCovid from '../models/ChecklistsCovid'
import { Console } from "console";

export = { 
    async createChecklist(request: Request, response: Response) {
        
        const objCheck : CheckCovidInterfaceDTO = request.body;
        
        if(objCheck) {
            const realizedBy = await User.findOne({ "_id": objCheck.realizedBy });

            if(!realizedBy) return response.status(404).json(
                { error: 'Não existe nenhum usuario com este ID!' 
            });

            let replacements : CheckCovidInterfaceDTO = objCheck;
            
            replacements = {
                ...replacements,
                realizedBy: realizedBy.name
            }

            let obj : CheckCovidInterface = await ChecklistsCovid.create(objCheck).catch((err : any) => {
                return response.status(400).json(
                    { error: err 
                }); 
            });

            const path = await createPdf(
                replacements, 
                "./src/templates/pdf/checklistCovid.html", 
                String(obj._id));

            await ChecklistsCovid.updateOne(
                {
                    "_id": obj._id,
                }, 
                { 
                    pdfPath: path
                },
            ).catch((err : any) => {
                return response.status(400).json(
                    { error: err 
                }); 
            });
            
            return response.status(200).json({}); 
        }

    },

    async listChecklist(request: Request, response: Response) {
        const limit : Number = Number(request.query.limit ? request.query.limit : 0)
        const offset : Number = Number(request.query.offset ? request.query.offset : 0)

        if(
            (limit < offset) 
            || 
            (offset === 0 && limit === 0)) {

            return response.status(200).json(await ChecklistsCovid.find().skip(0).limit(20));
        }

        else return response.status(200).json(await ChecklistsCovid.find().skip(offset).limit(limit));
    },

    async getChecklistByID(request: Request, response: Response) {
        const _id = request.query._id

        return response.status(200).json(await ChecklistsCovid.findOne({_id: _id}));
    },

    async listChecklistByDate(request: Request, response: Response) {
        const date : Date = new Date(request.query.date ? String(request.query.date) : String(Date.now()))

        if(date.toString() === 'Invalid Date' || date.toString() === 'NaN') {
            var init : Date = new Date()
            var end : Date = new Date()
            
            init.setHours(0,0,0,0);
            end.setHours(23,59,59,999);

            return response.status(200).json(
                await ChecklistsCovid.find(
                    {
                        date: { $gt: init, $lt: end } 
                    }
                )
            );
        } else {
            var init = new Date(String(date))
            var end = new Date(String(date))
            
            init.setHours(-3)
            init.setMinutes(0)
            init.setSeconds(0)
            init.setMilliseconds(0)

            end.setHours(20)
            end.setMinutes(59)
            end.setSeconds(59)
            end.setMilliseconds(999)

            return response.status(200).json(
                await ChecklistsCovid.find(
                    {
                        date: { $gt: init, $lt: end } 
                    }
                )
            );
        }
    }
}