import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deletePropertyById = async (id) => {
    const prisma = new PrismaClient();
    const property = await prisma.property.deleteMany({
        where: { id },
    });

    if (!property || property.count === 0) {
        throw new NotFoundError("Property", id);
    }

    return property.count > 0 ? id : null;
}

export default deletePropertyById;