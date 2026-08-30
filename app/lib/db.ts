import { PrismaClient } from "@prisma/client/extension";


const globarForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const db = globarForPrisma.prisma ?? new PrismaClient()

if(process.env.NODE_ENV!="production"){
    globarForPrisma.prisma = db
}