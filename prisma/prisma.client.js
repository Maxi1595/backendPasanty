const { PrismaClient } = require('@prisma/client');

const globalForPrisma = globalThis;

const PrismaSingleton = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = PrismaSingleton;
}

module.exports = {PrismaSingleton};