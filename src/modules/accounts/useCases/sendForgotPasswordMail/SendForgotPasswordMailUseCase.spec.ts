import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "@shared/errors/AppError"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let mailProvider: MailProviderInMemory

describe("Send Forgot Mail", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    mailProvider = new MailProviderInMemory()

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it("Should be able to send a forgot password email to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail")

    await usersRepositoryInMemory.create({
      driver_license: "664811",
      email: "asd@asd.com",
      name: "Test",
      password: "1234"
    })

    await sendForgotPasswordMailUseCase.excute("asd@asd.com")

    expect(sendMail).toHaveBeenCalled()
  })

  it("should not be able to send an email if user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.excute("lala@lalala.com")
    ).rejects.toEqual(new AppError("User does not exist!"))
  })

  it("should be able to create an user token", async () => {
    const generateTokenEmail = jest.spyOn(usersTokensRepositoryInMemory, "create")

    usersRepositoryInMemory.create({
      driver_license: "664811",
      email: "asd@asd.com",
      name: "Test",
      password: "1234"
    })

    await sendForgotPasswordMailUseCase.excute("asd@asd.com")

    expect(generateTokenEmail).toHaveBeenCalled()
  })
})