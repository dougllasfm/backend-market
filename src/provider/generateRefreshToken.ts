import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs"

const prisma = new PrismaClient();

const generateRefreshToken = async function (companyId: number) {
  try {
    const expiresIn = dayjs().add(45, "second").unix()
    const generateRefreshToken = await prisma.refreshToken.create({
      data: {
        companyId: companyId,
        expiresIn: expiresIn
      },
    })
    return generateRefreshToken
  } catch (error) {
    console.log(error)
  }
}

export { generateRefreshToken }