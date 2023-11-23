import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight, amenities) => {
    const prisma = new PrismaClient();
    const properties = await prisma.property.findMany({
        where: {
            ...location && { location: { contains: location } },
            ...pricePerNight && { pricePerNight: { equals: parseFloat(pricePerNight) } },
            ...amenities && { amenities: { some: { name: { contains: amenities } } } }
        }
    });

    return properties;
};

export default getProperties;
