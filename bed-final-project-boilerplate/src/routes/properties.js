import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        let properties = await getProperties();
        // Convert pricePerNight to a number
        properties = properties.map(property => ({
            ...property,
            pricePerNight: parseFloat(property.pricePerNight),
        }));
        res.json(properties);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, hostId } = req.body;
        const newProperty = await createProperty(
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            rating,
            hostId
        );
        res.status(201).json(newProperty);
    } catch (error) {
        next(error);
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const property = await getPropertyById(id);
        // Convert pricePerNight to a number
        property.pricePerNight = parseFloat(property.pricePerNight);
        res.status(200).json(property);

    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const property = await deletePropertyById(id);
        res.status(200).json({
            message: `Property with id ${id} successfully deleted`
        })
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, hostId, } = req.body;
        const updateProperty = await updatePropertyById(id, {
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            rating,
            hostId,
        })
        
        res.status(200).json(updateProperty);
    } catch (error) {
        next(error);
    }
});

export default router