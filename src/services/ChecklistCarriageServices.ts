import { Response, Request } from "express";
import CheckCovidInterface, { CheckCovidInterfaceDTO } from "../interfaces/ChecklistCovid";
import createPdf from '../utils/GeneratePDF'
import User from '../models/User'
import ChecklistCarriage from '../models/ChecklistCarriage'
import SecurityInterface, { SecurityInterfaceDTO } from "../interfaces/SecurityInterface";

export = { 
    async createChecklist(request: Request, response: Response) {
        
        const objCheck : SecurityInterfaceDTO = request.body;
        
        if(objCheck) {
            const realizedBy = await User.findOne({ "_id": objCheck.realizedBy });

            if(!realizedBy) return response.status(404).json(
                { error: 'Não existe nenhum usuario com este ID!' 
            });

            let replacements : SecurityInterfaceDTO = objCheck;
            
            replacements = {
                ...replacements,
                realizedBy: String(realizedBy.name)
            }

            let obj : SecurityInterface = await ChecklistCarriage.create(objCheck).catch((err : any) => {
                return response.status(400).json(
                    { error: err 
                }); 
            });

            const path = await createPdf(
                replacements, 
                "./src/templates/pdf/checklistSecurity.html", 
                String(obj._id));

            await ChecklistCarriage.updateOne(
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
            
            return response.status(200).json(
                { response: 'Done!' 
            }); 
        }

    },

    async listChecklist(request: Request, response: Response) {
        const limit : Number = Number(request.query.limit ? request.query.limit : 0)
        const offset : Number = Number(request.query.offset ? request.query.offset : 0)

        if(
            (limit < offset) 
            || 
            (offset === 0 && limit === 0)) {

            return response.status(200).json(await ChecklistCarriage.find().skip(0).limit(10));
        }

        else return response.status(200).json(await ChecklistCarriage.find().skip(offset).limit(limit));
    }
}