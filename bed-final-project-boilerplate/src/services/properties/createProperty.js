import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../errors/BadRequestError.js";

const createProperty = async(
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    rating,
    hostId
) => {
    const missingFields = [];
    if (!title) {
        missingFields.push('title');
    }
    if (!description) {
        missingFields.push('description');
    }
    if (!location) {
        missingFields.push('location');
    }
    if (!pricePerNight) {
        missingFields.push('price per night');
    }
    if (!bedroomCount) {
        missingFields.push('bedroom count');
    }
    if (!bathRoomCount) {
        missingFields.push('bathroom count');
    }
    if (!maxGuestCount) {
        missingFields.push('maximum guest count');
    }
    if (!rating) {
        missingFields.push('rating');
    }
    if (!hostId) {
        missingFields.push('host ID');
    }

    if (missingFields.length > 0) {
        throw new BadRequestError(`The following fields are required to create a property: ${missingFields.join(', ')}`);
    }


    const prisma = new PrismaClient();
    const property = await prisma.property.create({
        data: {
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            rating,
            hostId,
        }
    });

    return property;
};

export default createProperty