import { generateRefreshToken } from "src/provider/generateRefreshToken";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { generateTokenProvider } from "src/provider/generateTokenProvider";
const prisma = new PrismaClient();

const refreshTokenCompanyCase = async function (refresh_token: string) {
  try {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });

    if (!refreshToken) {
      console.log("deu erro");
      return false;
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken?.expiresIn)
    );

    // gera um novo token para a empresa
    const token = await generateTokenProvider(refreshToken.companyId);

    if (refreshTokenExpired) {
      await prisma.refreshToken.deleteMany({
        where: {
          companyId: refreshToken.companyId,
        },
      });

      const newRefreshToken = await generateRefreshToken(refreshToken.companyId);

      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  } catch (error) {
    console.log(error);
  }
};

export { refreshTokenCompanyCase };
