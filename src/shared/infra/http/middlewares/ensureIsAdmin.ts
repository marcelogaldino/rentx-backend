import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function ensureIsAdmin(request: Request, response: Response, next: NextFunction) {
  const { id } = request.user

  const usersRepository = new UsersRepository()
  const user = await usersRepository.findById(id)

  if (!user) throw new AppError("Not a valid user, please signup")

  if (!user.isAdmin) {
    throw new AppError("User isn't an admin!")
  }

  return next()
}
