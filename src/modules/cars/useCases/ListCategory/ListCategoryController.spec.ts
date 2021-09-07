import { app } from '@shared/infra/http/app'
import { hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import request from 'supertest'

import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm'

let connection: Connection
describe("Create category controller", () => {

  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidv4()
    const password = await hash("admin", 8)

    connection.query(
      `
      INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      VALUES('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'now()', 'XXXXX')
      `
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentalx.com",
      password: "admin"
    })

    const { token } = responseToken.body

    const res = await request(app)
      .post("/categories")
      .send({
        name: "Category supertest list",
        description: "category supertest description list"
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    const response = await request(app).get("/categories")

    expect(response.status).toBe(200)
  })
})