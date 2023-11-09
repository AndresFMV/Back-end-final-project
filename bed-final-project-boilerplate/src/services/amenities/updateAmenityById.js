import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateAmenityById = async (id, name) => {
    const prisma = new PrismaClient();
    const amenity = await prisma.amenity.updateMany({
        where: { id },
        data: name,
    })

    if (!amenity || amenity.count === 0) {
        throw new NotFoundError("Amenity", id);
    }

    return id;
};

export default updateAmenityById;