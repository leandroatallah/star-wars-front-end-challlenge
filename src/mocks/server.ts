import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Setup the server
export const server = setupServer(...handlers)
