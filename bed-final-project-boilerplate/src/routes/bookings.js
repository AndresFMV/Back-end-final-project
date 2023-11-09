import { Router } from "express";
import getBooking from "../services/bookings/getBookings.js";
import createBooking from "../services/bookings/createBooking.js";
import getBookingById from "../services/bookings/getBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const { userId } = req.query
        const bookings = await getBooking(userId);
        res.json(bookings);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus, userId, propertyId } = req.body;
        const newBooking = await createBooking(checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus, userId, propertyId);
        res.status(201).json(newBooking);
    } catch (error) {
        next(error);
    }
});


router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await getBookingById(id);
        res.status(200).json(booking);

    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await deleteBookingById(id);
        res.status(200).json({
            message: `booking with id ${id} was deleted!`
        })
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus, userId, propertyId } = req.body;
        const booking = await updateBookingById(id, { checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus, userId, propertyId })

        res.status(200).json(booking)
    } catch (error) {
        next(error);
    }
});

export default router;