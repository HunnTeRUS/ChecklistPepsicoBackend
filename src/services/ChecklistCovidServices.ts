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
            
            return response.status(200).json(
                { error: 'Done!' 
            }); 
        }

    }
}