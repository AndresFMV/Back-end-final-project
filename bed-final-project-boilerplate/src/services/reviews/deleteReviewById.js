import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteReviewById = async (id) => {
    const prisma = new PrismaClient();
    const review = await prisma.review.deleteMany({
        where: { id },
    });

    if (!review || review.count === 0) {
        throw new NotFoundError("Review", id);
    }

    return review.count > 0 ? id : null;
}

export default deleteReviewById