import { config } from 'dotenv'
import { setupConnection } from './playWithAura.js'

config()
// Create Express instance
export const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD, APP_PORT } =
  process.env

setupConnection()
