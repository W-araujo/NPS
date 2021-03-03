import * as yup from 'yup'
import { AppError } from "../errors/AppError"
import { Request, Response, NextFunction } from 'express'

class UserValidations {

    async create(request: Request, response: Response, _next: NextFunction) {

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        })

        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (error) {
            throw new AppError(error)
        }

        return _next()
    }
}

export { UserValidations }