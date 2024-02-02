import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from '@global/env.mjs'

const globalForPrisma: any = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  }).$extends(withAccelerate())

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export { prisma }
