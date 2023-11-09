import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateHostById = async (id, updatedHost) => {
    const prisma = new PrismaClient();
    const host = await prisma.host.updateMany({
        where: { id },
        data: updatedHost
    });

    if (!host || host.count === 0) {
        throw new NotFoundError("Host", id);
    }

    return host.count > 0 ? id : null;
}

export default updateHostById;