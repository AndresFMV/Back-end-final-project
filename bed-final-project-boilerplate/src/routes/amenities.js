import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import createAmenity from "../services/amenities/createAmenity.js";
import getAmenityById from "../services/amenities/getAmenityBYId.js";
import deleteAmenity from "../services/amenities/deleteAmenityById.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const amenities = await getAmenities();
        res.json(amenities);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { name } = req.body;
        const newAmenity = await createAmenity(name);
        res.status(201).json(newAmenity);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const amenity = await getAmenityById(id);
        res.status(200).json(amenity);
        
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const amenity = await deleteAmenity(id);
        res.status(200).send({
            message: `Amenity with id ${id} successfully deleted`
        });
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updateAmenity = await updateAmenityById(id, { name })
        res.status(200).json(updateAmenity);
    } catch (error) {
        next(error);
    }
});

export default router;