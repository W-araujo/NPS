import * as yup from 'yup'
import { AppError } from "../errors/AppError"
import { Request, Response, NextFunction } from 'express'

class SendMailValidations {

    async execute(request: Request, response: Response, _next: NextFunction) {

        const schema = yup.object().shape({
            email: yup.string().email().required(),
            survey_id: yup.string().required()
        })

        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (error) {
            throw new AppError(error)
        }

        return _next()
    }
}

export { SendMailValidations }