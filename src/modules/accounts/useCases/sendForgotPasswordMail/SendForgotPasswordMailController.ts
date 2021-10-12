import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailCdontroller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body
    const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase)

    await sendForgotPasswordMailUseCase.excute(email)

    return response.send()
  }
}

export { SendForgotPasswordMailCdontroller }