import { Request, Response } from 'express'
import { getCustomRepository, Not, IsNull } from 'typeorm'
import { AppError } from '../errors/AppError'
import { SurveysUserRepository } from '../repositories/SurveysUserRepository'

class NPSController {
    async execute(request: Request, response: Response) {
        const { survey_id } = request.params

        const surveysUserRepository = getCustomRepository(SurveysUserRepository)

        const surveyUsers = await surveysUserRepository.find({
            survey_id,
            value: Not(IsNull())
        })

        if (surveyUsers.length === 0) {
            throw new AppError("Survey users not found!")
        }

        const detractor = surveyUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length

        const promoters = surveyUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10

        ).length

        const passive = surveyUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length

        const totalAnswers = surveyUsers.length

        const calculate = Number((((promoters - detractor) / totalAnswers) * 100).toFixed(2))

        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswers,
            nps: calculate
        })
    }
}
export { NPSController }