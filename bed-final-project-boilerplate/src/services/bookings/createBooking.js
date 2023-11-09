import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../errors/BadRequestError.js";

const createBooking = async (checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus, userId, propertyId) => {
    const missingFields = [];
    if (!checkinDate) {
        missingFields.push('check-in date');
    }
    if (!checkoutDate) {
        missingFields.push('check-out date');
    }
    if (!numberOfGuests) {
        missingFields.push('number of guests');
    }
    if (!totalPrice) {
        missingFields.push('total price');
    }
    if (!bookingStatus) {
        missingFields.push('booking status');
    }
    if (!userId) {
        missingFields.push('user ID');
    }
    if (!propertyId) {
        missingFields.push('property ID');
    }

    if (missingFields.length > 0) {
        throw new BadRequestError(`The following fields are required to create a booking: ${missingFields.join(', ')}`);
    }
    
    const prisma = new PrismaClient();
    const booking = await prisma.booking.create({
        data: {
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus,
            userId,
            propertyId
        },
    });

    return booking;
}

export default createBooking