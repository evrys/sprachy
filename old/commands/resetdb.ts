import shell from 'shelljs'
import faunadb from 'faunadb'
import * as schema from '$lib/server/schema'

export async function resetdb() {
  const dbname = 'sprachy_dev'
  shell.exec(`npx fauna delete-database --domain=localhost --port=8443 --secret=secret --scheme=http ${dbname}`)
  shell.exec(`npx fauna create-database --domain=localhost --port=8443 --secret=secret --scheme=http ${dbname}`)
  const output = shell.exec(`npx fauna create-key --domain=localhost --port=8443 --secret=secret --scheme=http ${dbname} admin`)
  const secret = output.match(/secret: (\S+)/)[1]

  // Apply the schema
  const fauna = new faunadb.Client({
    secret: secret,
    domain: 'localhost',
    port: 8443,
    scheme: 'http'
  })

  await fauna.query(schema.collections)
  await fauna.query(schema.indexes)

  // Put the secret in .env
  shell.exec(`sed -i '' -e 's/FAUNA_ADMIN_KEY=.*/FAUNA_ADMIN_KEY=${secret}/g' .env`)
}