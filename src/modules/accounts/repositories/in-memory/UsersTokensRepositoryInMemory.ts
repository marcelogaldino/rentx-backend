import { ICreateUserTokenDto } from "@modules/accounts/dtos/ICreateUserTokenDto";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  userTokens: UserTokens[] = []

  async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDto): Promise<UserTokens> {
    const userToken = new UserTokens()

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    })

    this.userTokens.push(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const userToken = this.userTokens.find(userToken => userToken.id === user_id && userToken.refresh_token === refresh_token)

    return userToken
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.userTokens.find(userToken => userToken.id === id)
    this.userTokens.splice(this.userTokens.indexOf(userToken))
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.userTokens.find(userToken => userToken.refresh_token === refresh_token)

    return userToken
  }

}

export { UsersTokensRepositoryInMemory }