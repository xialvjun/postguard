import { defineTable, TableRow, Schema } from "squid/schema"
import { spreadUpdate, sql } from "squid/pg"
import { database } from "./_database"

type UserRecord = TableRow<typeof usersTable>

const usersTable = defineTable("users", {
  id: Schema.default(Schema.Number),
  name: Schema.String,
  email: Schema.String
})

export async function updateUser(userID: number, update: Pick<UserRecord, "name" | "email">) {
  await database.query(sql`
    UPDATE users SET ${spreadUpdate(update)} WHERE id = ${userID}
  `)
}
