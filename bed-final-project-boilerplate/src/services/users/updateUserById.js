import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateUserById = async (id, updatedUser) => {
    const prisma = new PrismaClient();
    const user = await prisma.user.updateMany({
        where: { id },
        data: updatedUser
    });

    if (!user || user.count === 0) {
        throw new NotFoundError("User", id);
    }

    return id
};

export default updateUserById;