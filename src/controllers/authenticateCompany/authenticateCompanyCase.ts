
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { generateTokenProvider } from 'src/provider/generateTokenProvider';
const prisma = new PrismaClient();

type Props = {
  email: string;
  password: string;
};

const authenticateCompany = async function ({ email, password }: Props) {
  try {
    const companyAlreadyExists = await prisma.companys.findUnique({
      where: { email: email },
    });

    if (!companyAlreadyExists) {
      console.log("Usuário ou senha estão incorretos primeiro")
      return false
    }

    const passwordMatch = await compare(
      password,
      companyAlreadyExists.password
    );

    if (!passwordMatch) {
      console.log("Usuário ou senha estão incorretos primeiro")
      return false
    }

    // gerar token da empresa
    const token = await generateTokenProvider(companyAlreadyExists.id)

    return { token, companyAlreadyExists }
  } catch (error) {
    console.log(error)
  }
};

export { authenticateCompany };
