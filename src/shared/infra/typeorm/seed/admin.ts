import { v4 as uuidv4 } from "uuid"
import { hash } from "bcrypt";

import createConnection from "../index"

async function create() {
  const connection = await createConnection("localhost")

  const id = uuidv4()
  const password = await hash("admin", 8)

  connection.query(
    `
    INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'now()', 'XXXXX')
    `
  )

  await connection.close()
}

create().then(() => console.log("seed user admin created!"))