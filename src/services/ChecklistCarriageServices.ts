import { Response, Request } from "express";
import createPdf from '../utils/GeneratePDF'
import User from '../models/User'
import ChecklistCarriage from '../models/ChecklistCarriage'
import SecurityInterface, { SecurityInterfaceDTO } from "../interfaces/SecurityInterface";
import Carriers from "../models/Carriers";
import { UnitInterfaceModel } from "../interfaces/CompanyInterface";
import aws from 'aws-sdk'
import fs from 'fs'

export = {
    async createChecklist(request: Request, response: Response) {

        const objCheck: SecurityInterfaceDTO = request.body;

        if (objCheck.coDriverCPF === objCheck.driverCPF)
            return response.status(40).json(
                {
                    error: 'O CPF do motorista não pode ser igual ao CPF do ajudante!'
                });

        if (objCheck) {
            const realizedBy = await User.findOne({ "_id": objCheck.realizedBy });

            if (!realizedBy) return response.status(404).json(
                {
                    error: 'Não existe nenhum usuario com este ID!'
                });

            const unit = await Carriers.findOne({ "_id": realizedBy.shipping })

            if (!unit) return response.status(404).json(
                {
                    error: 'Não existe nenhuma unidade com este ID!'
                });

            let replacements: SecurityInterfaceDTO = objCheck;

            replacements = {
                ...replacements,
                realizedBy: String(realizedBy.name)
            }

            let obj: SecurityInterface = await ChecklistCarriage.create(objCheck).catch((err: any) => {
                return response.status(400).json(
                    {
                        error: err
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
            ).catch((err: any) => {
                return response.status(400).json(
                    {
                        error: err
                    });
            });

            var newChecklist: SecurityInterface = await ChecklistCarriage.findOne({ _id: obj._id })

            return response.status(200).json(newChecklist);
        }

    },

    async listChecklist(request: Request, response: Response) {
        const limit: Number = Number(request.query.limit ? request.query.limit : 0)
        const offset: Number = Number(request.query.offset ? request.query.offset : 0)

        var listCheck: SecurityInterface[] = []
        if (
            (limit < offset)
            ||
            (offset === 0 && limit === 0)) {

            listCheck = await ChecklistCarriage.find().skip(0).limit(20)
        } else {
            listCheck = await ChecklistCarriage.find().skip(offset).limit(limit)
        };

        for (var i = 0; i < listCheck.length; i++) {
            const name = await User.findOne({ "_id": String(listCheck[i].realizedBy) })
            listCheck[i].realizedBy = name.name

            const unit = await Carriers.findOne({ "units._id": String(listCheck[i].currentUnit) })

            if (unit) {
                const units: UnitInterfaceModel[] = unit.units;

                for (var j = 0; j < units.length; j++) {
                    if (String(units[j]._id) === String(listCheck[i].currentUnit)) {
                        listCheck[i].currentUnit = String(units[j].name)
                    }
                }
            } else {
                listCheck[i].currentUnit = "Unidade não consta mais no sistema."
            }
        }

        return response.status(200).json(listCheck)
    },

    async getChecklistById(request: Request, response: Response) {
        const _id = request.query._id

        return response.status(200).json(await ChecklistCarriage.findOne({ _id: _id }));
    },

    async listChecklistByDate(request: Request, response: Response) {
        const date: Date = new Date(request.query.date ? String(request.query.date) : String(Date.now()))

        if (date.toString() === 'Invalid Date' || date.toString() === 'NaN') {
            var init: Date = new Date()
            var end: Date = new Date()

            init.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);

            return response.status(200).json(await ChecklistCarriage.find(
                {
                    date: { $gt: init, $lt: end }
                }));
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

            return response.status(200).json(await ChecklistCarriage.find(
                {
                    date: { $gt: init, $lt: end }
                }));
        }
    },
}