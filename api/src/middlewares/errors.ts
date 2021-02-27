import { AppError } from '../errors/AppError'
import { Request, Response, NextFunction } from 'express'

function error(err: Error, request: Request, response: Response, _next: NextFunction) {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }
    return response.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`
    })
}

export { error }