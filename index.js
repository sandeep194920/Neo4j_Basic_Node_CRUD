import { config } from 'dotenv'
import {
  getUser,
  setupConnection,
  createUser,
  createItem,
} from './playWithAura.js'

config()
// Create Express instance
export const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD, APP_PORT } =
  process.env

export const driver = await setupConnection()

// READ OPERATION - GET EXISTING USER
// const existingUser = await getUser()
// console.log('The read user is', existingUser)

// WRITE OPERATION - CREATE A USER
// const user = await createUser('john1', 'John', 30)
// console.log('The users are', user)

// WRITE OPERATION - CREATE AN ITEM
const item = await createItem('chair')
console.log('The item created is', item)
