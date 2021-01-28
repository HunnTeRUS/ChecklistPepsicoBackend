import { Response, Request } from "express";
import Company from '../models/Carriers'
import { CompanyCarrierInterfaceDTO, UnitInterface } from '../interfaces/CompanyInterface'

export = {
    async createCarrier(request: Request, response: Response) {
        const obj: CompanyCarrierInterfaceDTO = request.body;

        const exist = await Company.findOne({
            "name_lower":
                { $regex: new RegExp("^" + obj.name.toLowerCase(), "i") }
        })

        if (!exist) {
            const created = await Company.create(obj);
            return response.status(200).json(created)
        } else {
            return response.status(200).json(exist)
        }
    },

    async removeCarrier(request: Request, response: Response) {
        const {_id} = request.query;

        const exist = await Company.findOne({
            "_id": String(_id)
        })

        if (exist) {
            await Company.deleteOne({_id: String(_id)});
            return response.status(200).json()
        } else {
            return response.status(404).json({error: "Não existe nenhuma transportadora com este id."})
        }
    },

    async listCarriers(request: Request, response: Response) {
        const carriers = await Company.find();

        return response.status(200).json(carriers)
    },

    async listCarriersById(request: Request, response: Response) {
        const {_id} = request.query;

        const carriers = await Company.findOne({
            _id: _id
        });

        if(carriers)
            return response.status(200).json(carriers)
        else return response.status(404).json({error: "Não existe nenhuma transportadora com este id"})
    },

    async listCarriersByName(request: Request, response: Response) {
        const {name} = request.query;

        const carriers = await Company.find({ "name": new RegExp("^" + name) })

        return response.status(200).json(carriers)
    },

    async updateCarrierName(request: Request, response: Response) {
        const {_id, name} = request.body;

        await Company.updateOne({ "_id": _id }, {
            "name": name
        })

        const carriers = await Company.findOne({ "_id": _id })

        return response.status(200).json(carriers)
    },

    async insertUnity(request: Request, response: Response) {
        const {_id} = request.query;
        const obj : UnitInterface = request.body;
        
        await Company.updateOne({ "_id": _id }, { $push: { units: obj } })

        const carriers = await Company.findOne({ "_id": _id })

        return response.status(200).json(carriers)
    },

    async removeUnity(request: Request, response: Response) {
        const {carrierId, unitId} = request.query;
        
        const exist = await Company.findOne({ "_id": carrierId })

        if(exist) {
            await Company.updateOne({ "_id": carrierId },{ "$pull" : { "units" : { "_id" : unitId } } }).catch( (error : any) =>{
                return response.status(400).json({"error": error})
            });
        }

        return response.status(200).json()
    },

    async getUnitById(request: Request, response: Response) {
        const {_idUnit, _idCarrier} = request.query;
        
        const exist = await Company.findOne({ "_id": _idCarrier, "units" : { "_id" : _idUnit } })

        if(exist) {
            return response.status(200).json(exist)
        } else return response.status(404).json({error: "Não existe nenhuma unidade com estes ids"})
    },
}