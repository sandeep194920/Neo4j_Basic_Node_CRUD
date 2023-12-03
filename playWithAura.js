// In this file, we will read, create, update nodes on neo4j aura db

import { NEO4J_PASSWORD, NEO4J_URI, NEO4J_USERNAME, driver } from './index.js'
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
    return driver
  } catch (err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
}

/*READ OPERATION*/
/* Now that the basic connection works, let's access a node that is created in Aura and print it here*/
export const getUser = async () => {
  const session = driver.session()
  const res = await session.executeRead(async (tx) => {
    return await tx.run(
      `MATCH (user:User {name:$name})
      RETURN user`,
      { name: 'Susan' }
    )
  })

  const [firstUser] = res.records
  console.log('The first user is')
  console.log(firstUser)
  const { name } = firstUser?.get('user')?.properties || 'NOT_FOUND'

  /* IF there are multiple records you want to have in an array then do the below. 
  Generally you will take this approach if you have LIMIT at the end of query*/
  // const names = res.records.map((record) => record.get('user.name'))
  // console.log(names)

  await session.close()
  return name
}

/*WRITE OPERATION*/
export const createUser = async (username, name, age) => {
  const session = driver.session()
  const res = await session.executeWrite(async (tx) => {
    return await tx.run(
      `MERGE (user:User {username: $username})
      ON CREATE SET user.name = $name, user.age = $age
      RETURN user.name as name, user.username as username, user.age as age`,
      { username: username, name: name, age: age }
    )
  })
  const users = res.records.map((record) => {
    return {
      username: record.get('username'),
      name: record.get('name'),
      age: record.get('age'),
    }
  })

  return users
}

/*WRITE OPERATION - ITEM WITH RANDOM id*/
export const createItem = async (name) => {
  const session = driver.session()
  const res = await session.executeWrite(async (tx) => {
    return await tx.run(
      `MERGE (item:Item {item_name: $name, item_id: randomUuid()})
      RETURN item`,
      { name }
    )
  })

  const [firstItem] = res.records
  const { item_name, item_id } = firstItem.get('item').properties
  return { item_name, item_id }
}
