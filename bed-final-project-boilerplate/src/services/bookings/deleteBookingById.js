import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteBookingById = async (id) => {
    const prisma = new PrismaClient();
    
    const booking = await prisma.booking.deleteMany({
        where: { id },
    });

    if (!booking || booking.count === 0) {
        throw new NotFoundError("Booking", id);
    }

    return booking.count > 0 ? id : null;
};

export default deleteBookingById;