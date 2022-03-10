import { generateRefreshToken } from 'src/provider/generateRefreshToken';
import { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { generateTokenProvider } from 'src/provider/generateTokenProvider';
const prisma = new PrismaClient();

type Props = {
  email: string;
  password: string;
};

const userAuthenticateCase = async function ({ email, password }: Props) {
  try {
    const userAlreadyExists = await prisma.users.findUnique({
      where: { email: email },
    });

    if (!userAlreadyExists) {
      console.log("Usuário ou senha estão incorretos primeiro")
      return false
    }

    const passwordMatch = await compare(
      password,
      userAlreadyExists.password
    );

    if (!passwordMatch) {
      console.log("Usuário ou senha estão incorretos primeiro")
      return false
    }

    // gerar token do usuario
    const token = await generateTokenProvider(userAlreadyExists.id)

    return { token }
  } catch (error) {
    console.log(error)
  }
};

export { userAuthenticateCase }