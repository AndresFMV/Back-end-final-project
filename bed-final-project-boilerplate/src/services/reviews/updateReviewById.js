import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateReviewById = async (id, updatedReview) => {
    const prisma = new PrismaClient();

    const { userId, propertyId, ...rest} = updatedReview;

    const review = await prisma.review.updateMany({
        where: { id },
        data: {
            ...rest,
            userId: userId,
            propertyId: propertyId
        },
    });

    if (!review || review.count === 0 ) {
        throw new NotFoundError("Review", id);
    }

    return review
}

export default updateReviewById;

