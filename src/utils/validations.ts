import { celebrate, Joi, Segments } from 'celebrate';

export function validateUser() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      _id: Joi.string().optional(),
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
      cpf: Joi.string().required().length(11),
      rg: Joi.string().required().length(9),
      sex: Joi.string().required().length(1),
      birthDay: Joi.date().required(),
      phoneNumber: Joi.string().required().length(11),
      pictureUrl: Joi.string().required(),
      terms: Joi.object({
        acceptRegisterTerms: Joi.boolean().required(),
        acceptMedicalRecordTerms: Joi.boolean().optional(),
        acceptClinicsAccess: Joi.boolean().optional(),
      }),
      medicalRecord: Joi.object({
        ocupation: Joi.string().required(),
        emergencyNumber: Joi.string().required(),
        emergencyName: Joi.string().required(),
        aestheticTreatment: Joi.string().required(),
        medicinesAllergy: Joi.string().required(),
        constantMedice: Joi.string().required(),
        usesAcidInSkin: Joi.boolean().required(),
        bloodPressure: Joi.string().required(),
        hearthProblems: Joi.string().required(),
        sunExposition: Joi.boolean().required(),
        hasCancer: Joi.string().required(),
        lactoseIntolerance: Joi.boolean().required(),
        hasDiabetes: Joi.boolean().required(),
      }),
      address: Joi.object({
        cep: Joi.string().required().length(8),
        streetName: Joi.string().required(),
        number: Joi.number().required(),
        complement: Joi.string().optional(),
        city: Joi.string().required(),
        state: Joi.string().required(),
      }),
      dentalArch: Joi.object([
        {
          name: Joi.string().required(),
          procedures: Joi.object([
            {
              scheduleId: Joi.string().required(),
              services: Joi.object([
                {
                  serviceId: Joi.string().required(),
                },
              ]).required(),
            },
          ]).required(),
        },
      ]).optional(),
    }),
  });
}

export function validateId() {
  return celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      _id: Joi.string().optional().min(24),
    }),
  });
}

export function validateClinic() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      _id: Joi.string().optional(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      responsible: Joi.string().required(),
      slogan: Joi.string().optional(),
      cnpj: Joi.string().length(14).required(),
      cro: Joi.string().required(),
      email: Joi.string().email().required(),
      phoneNumber1: Joi.string().min(10).max(11).required(),
      phoneNumber2: Joi.string().min(10).max(11).optional(),
      celPhone: Joi.string().length(11).required(),
      mainImage: Joi.string().optional(),
      logo: Joi.string().optional(),
      address: Joi.object({
        cep: Joi.string().length(8).required(),
        streetName: Joi.string().required(),
        number: Joi.string().required(),
        complement: Joi.string().optional(),
        city: Joi.string().required(),
        state: Joi.string().required(),
      }),
      services: Joi.array(),
    }),
  });
}

export function validateSchedule() {
  return celebrate({
    [Segments.BODY]: Joi.object({
      _id: Joi.string().optional().length(24),
      date: Joi.date().required(),
      totalValue: Joi.string().required(),
      attestation: Joi.string().optional(),
      mediacalPrescription: Joi.string().optional(),
      userId: Joi.string().required(),
      clinicId: Joi.string().required(),
      services: Joi.object({
        _id: Joi.string().optional().length(24),
        idService: Joi.string().length(24).required(),
      }).required(),
      status: Joi.object({
        confirmed: Joi.boolean().optional(),
        cancelled: Joi.boolean().optional(),
        reason: Joi.string().optional(),
      }).optional(),
    }),
  });
}

export function validateUserLogin() {
  return celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email(),
      password: Joi.string(),
    }),
  });
}

export function validateClinicLogin() {
  return celebrate({
    [Segments.BODY]: Joi.object({
      cnpj: Joi.string().length(14),
      password: Joi.string(),
    }),
  });
}

export function validateEmail() {
  return celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
    }),
  });
}

export function validateCnpj() {
  return celebrate({
    [Segments.BODY]: Joi.object({
      cnpj: Joi.string().length(14).required(),
    }),
  });
}
