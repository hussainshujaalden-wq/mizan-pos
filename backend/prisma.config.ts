import path from 'path'
import { defineConfig } from 'prisma/config'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrate: {
    async adapter() {
      const connectionString = process.env.DIRECT_URL!
      const pool = new pg.Pool({ connectionString })
      return new PrismaPg(pool)
    },
  },
})