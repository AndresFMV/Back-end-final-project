import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../errors/BadRequestError.js";

const createAmenity = async (name) => {
    if (!name) {
        throw new BadRequestError('Name is requiered to create an amenity')
    }
    
    const prisma = new PrismaClient()

    const amenity = await prisma.amenity.create({
        data: {
            name
        }
    })

    return amenity
}

export default createAmenity;