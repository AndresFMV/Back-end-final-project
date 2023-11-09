import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateBookingById = async (id, updatedBooking) => {
    const prisma = new PrismaClient();

    const { userId, propertyId, ...rest } = updatedBooking;

    const booking = await prisma.booking.updateMany({
        where: { id },
        data: {
            ...rest,
            userId: userId,
            propertyId: propertyId
        },
    });

    if (!booking || booking.count === 0) {
        throw new NotFoundError("Booking", id);
    }

    return booking
};

export default updateBookingById;