import { celebrate, Joi, Segments } from 'celebrate'

export = {
    //user validations
    validateUserInsertion() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                cpf: Joi.string().min(11).max(11),
                rg: Joi.string().min(9).max(9),
                name: Joi.string().required(),
                shipping: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(4).required()
            }),
        });
    },

    //user validations
    removeUser() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                _id: Joi.string().required()
            }),
        });
    },

    verify() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                _id: Joi.string().required()
            }),
        });
    },

    getUserByName() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                nome: Joi.string().required(),
            }),
        });
    },

    getUserByEmail() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                _id: Joi.string().email().required(),
            }),
        });
    },

    updatePassword() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                _id: Joi.string().required(),
                oldPass: Joi.string().required(),
                newPass: Joi.string().min(4).required(),
            }),
        });
    },

    loginUser() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                cpf: Joi.string().required().min(11).max(11),
                password: Joi.string().required()
            }),
        });
    },

    forgotPassword() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                cpf: Joi.string().required().min(11).max(11),
                email: Joi.string().email().required()
            }),
        });
    },

    //-----------------------------------

    //CHECKLIST CARRIAGE API VALIDATIONS
    createCarriageChecklist() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                realizedBy: Joi.string().required(),
                date: Joi.date().required(),
                driverCPF: Joi.string().min(11).max(11).required(),
                driverName: Joi.string().required(),
                coDriverCPF: Joi.string().min(11).max(11).optional(),
                coDriverName: Joi.string().optional(),
                truckPlate: Joi.string().min(7).max(7).required(),
                currentUnit: Joi.string().required(),
                carriageInfos: Joi.object({
                    gloves: Joi.boolean().required(),
                    vest: Joi.boolean().required(),
                    chock: Joi.boolean().required(),
                    mask: Joi.boolean().required(),
                    safetyShoes: Joi.boolean().required(),
                    withoutAdornments: Joi.boolean().required()
                }), 
                observations: Joi.string().optional(),
                infringementExplanation: Joi.string().optional(),
            }),
        });
    },

    listCarriageChecklist() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                limit: Joi.number().min(0).optional(),
                offset: Joi.number().min(0).optional()
            }),
        });
    },

    getCarriageChecklistById() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                _id: Joi.string().required(),
            }),
        });
    },

    listCarriageChecklistByDate() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                date: Joi.date().required(),
            }),
        });
    },

    //----------------------------

    //CHECKLIST COVID API VALIDATIONS
    createCovidChecklist() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                personName: Joi.string().required(),
                personCPF: Joi.string().min(11).max(11).required(),
                date: Joi.date().required(),
                realizedBy: Joi.string().required(),
                unity: Joi.string().required(),
                hadContactWithSomeoneInfected: Joi.boolean().required(),
                hadSymptoms: Joi.boolean().required(),
                isCarryingAlcoholAndMask: Joi.boolean().required()
            }),
        });
    },

    listCovidChecklist() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                limit: Joi.number().min(0).optional(),
                offset: Joi.number().min(0).optional()
            }),
        });
    },

    getChecklistByID() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                _id: Joi.string().required(),
            }),
        });
    },

    listCovidChecklistByDate() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                date: Joi.date().required(),
            }),
        });
    },
    
    //-----------------------------

    //CARRIER SERVICES
    createCarrier() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required(),
                units: Joi.array().items(
                    Joi.object({
                        name: Joi.string().required(),
                        streetName: Joi.string().required(),
                        cep: Joi.string().min(8).max(8),
                        state: Joi.string().min(2).max(2).required(),
                        city: Joi.string().required(),
                    })
                )
            }),
        });
    },

    removeCarrier() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                _id: Joi.string().required()
            }),
        });
    },

    listCarriersById() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                _id: Joi.string().required()
            }),
        });
    },

    listCarriersByName() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                name: Joi.string().required()
            }),
        });
    },

    updateCarrierName() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                name: Joi.string().required(),
                _id: Joi.string().required(),
            }),
        });
    },

    insertUnity() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required(),
                streetName: Joi.string().required(),
                cep: Joi.string().min(8).max(8),
                state: Joi.string().min(2).max(2).required(),
                city: Joi.string().required(),
            }),
            [Segments.QUERY]: Joi.object().keys({
                _id: Joi.string().required(),
            }),
        });
    },

    removeUnity() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                carrierId: Joi.string().required(),
                unitId: Joi.string().required(),
            }),
        });
    },

};