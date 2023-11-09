import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updatePropertyById = async (id, updatedProperty) => {
    const prisma = new PrismaClient();

    const { hostId, ...rest } = updatedProperty

    const property = await prisma.property.updateMany({
        where: { id },
        data: {
            ...rest,
            hostId: hostId
        }
    });

    if (!property || property.count === 0) {
        throw new NotFoundError("Property", id);
    }

    return property
};

export default updatePropertyById
