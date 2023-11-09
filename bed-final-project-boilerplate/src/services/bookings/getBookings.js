import { PrismaClient } from "@prisma/client";

const getBooking = async (userId) => {
    const prisma = new PrismaClient();
    const getBooking = await prisma.booking.findMany({
        where: {
            userId: userId
        }
    });

    return getBooking;
};

export default getBooking;


