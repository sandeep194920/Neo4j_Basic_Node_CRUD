// In this file, we will read, create, update nodes on neo4j aura db

import { NEO4J_PASSWORD, NEO4J_URI, NEO4J_USERNAME } from './index.js'
import neo4j from 'neo4j-driver'

/* I'm following this guides here

https://graphacademy.neo4j.com/courses/app-nodejs/1-driver/1-about/
https://neo4j.com/docs/javascript-manual/current/
https://neo4j.com/docs/api/javascript-driver/current/

*/

export const setupConnection = async () => {
  try {
    const driver = neo4j.driver(
      NEO4J_URI,
      neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
    )
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)
  } catch (err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
}
