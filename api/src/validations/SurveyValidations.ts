import * as yup from 'yup'
import { AppError } from "../errors/AppError"
import { Request, Response, NextFunction } from 'express'

class SurveyValidations {

    async create(request: Request, response: Response, _next: NextFunction) {

        const schema = yup.object().shape({
            title: yup.string().required(),
            description: yup.string().required()
        })

        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (error) {
            throw new AppError(error)
        }

        return _next()
    }
}

export { SurveyValidations }