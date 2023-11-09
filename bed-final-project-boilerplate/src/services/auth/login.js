import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const login = async (username, password) => {
    const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: { username, password },
    });

    if (!user) {
        return null;
    }

    /* Debug
        if (!user) {
        throw new Error(`User not found: ${username} ${password}`);
    }

    if (user.password !== password) {
        throw new Error("Incorrect password");
    }
    */

    const token = jwt.sign({ userId: user.id }, secretKey);

    return token;
};

export default login;