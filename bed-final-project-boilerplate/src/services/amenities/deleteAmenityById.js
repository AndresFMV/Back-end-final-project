import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteAmenity = async (id) => {
    const prisma = new PrismaClient();
    const amenity = await prisma.amenity.deleteMany({
        where: { id },
    });

    if (!amenity || amenity.count === 0) {
        throw new NotFoundError("Amenity", id);
    }

    return amenity.count > 0 ? id : null;
};

export default deleteAmenity;