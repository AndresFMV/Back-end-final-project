import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import getReviewById from "../services/reviews/getReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const reviews = await getReviews();
        res.json(reviews);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { rating, comment, userId, propertyId, } = req.body;
        const newReview = await createReview(rating, comment, userId, propertyId,);

        res.status(201).json(newReview);
    
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await getReviewById(id);
        res.status(200).json(review);
    
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await deleteReviewById(id);
        res.status(200).json({
            message: `Review with id ${id} successfully deleted`
        })
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const updateReview = await updateReviewById(id, { rating, comment });

        res.status(200).json(updateReview);
    } catch (error) {
        next(error);
    }
});

export default router;