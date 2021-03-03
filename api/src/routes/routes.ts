import { Router } from 'express'

import { UserController } from '../controllers/UserController'
import { SurveysController } from '../controllers/SurveysController'
import { SendMailController } from '../controllers/SendMailController'
import { AnswerController } from '../controllers/AnswerController'
import { NPSController } from '../controllers/NPSController'
import { UserValidations } from "../validations/UserValidations"
import { SurveyValidations } from '../validations/SurveyValidations'
import { SendMailValidations } from '../validations/SendMailValidations'


//Controllers
const userController = new UserController()
const surveysController = new SurveysController()
const sendMailController = new SendMailController()
const answerController = new AnswerController()
const npsController = new NPSController()

//Validations
const userValidator = new UserValidations()
const surveyValidator = new SurveyValidations()
const sendMailValidator = new SendMailValidations()

const router = Router()

//Users
router
    .post("/users", userValidator.create, userController.create)

//Surveys
router
    .post("/surveys", surveyValidator.create, surveysController.create)
    .get("/surveys", surveysController.show)

//SendMail
router
    .post("/sendMail", sendMailValidator.execute, sendMailController.execute)

//Answers
router
    .get("/answers/:value", answerController.execute)

//NPS
router
    .get("/nps/:survey_id", npsController.execute)

export { router }