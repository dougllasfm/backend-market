import { sign } from "jsonwebtoken";

const generateTokenProvider = async function (userId: number) {
  // gerar token da empresa
  const token = sign({}, "c8cbb041-12e2-4448-9d10-b213a1634b40", {
    subject: userId.toString(),
    expiresIn: "20s",
  });

  return token
}

export { generateTokenProvider }