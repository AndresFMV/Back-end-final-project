import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../errors/BadRequestError.js";

const createReview = async (rating, comment, userId, propertyId) => {
    const missingFields = [];
    if (!rating) {
        missingFields.push('rating');
    }
    if (!comment) {
        missingFields.push('comment');
    }
    if (!userId) {
        missingFields.push('userId');
    }
    if (!propertyId) {
        missingFields.push('propertyId');
    }

    if (missingFields.length > 0) {
        throw new BadRequestError(`The following fields are required to create a review: ${missingFields.join(', ')}`);
    }
    
    const prisma = new PrismaClient();

    const review = await prisma.review.create({
        data: {
            rating,
            comment,
            userId,
            propertyId

        },
    });
    return review;
}

export default createReview