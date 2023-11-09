import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteHostById = async (id) => {
    const prisma = new PrismaClient();
    const host = await prisma.host.deleteMany({
        where: { id },
    });

    if (!host || host.count === 0) {
        throw new NotFoundError("Host", id);
    }

    return host.count > 0 ? id : null;
};

export default deleteHostById;

