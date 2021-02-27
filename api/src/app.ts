import 'reflect-metadata'
import express from 'express'
import "express-async-errors"
import createConnection from "./database"
import { router } from './routes/routes'
import { error } from './middlewares/errors'

createConnection()
const app = express()

app.use(express.json())
app.use(router)

app.use(error)


export { app }