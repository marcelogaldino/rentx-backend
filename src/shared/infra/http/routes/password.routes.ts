import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController'
import { SendForgotPasswordMailCdontroller } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController'
import { Router } from 'express'

const passwordRoutes = Router()

const sendPasswordForgotMailController = new SendForgotPasswordMailCdontroller
const resetPasswordUserController = new ResetPasswordUserController

passwordRoutes.post("/forgot", sendPasswordForgotMailController.handle)
passwordRoutes.post("/reset", resetPasswordUserController.handle)

export { passwordRoutes }