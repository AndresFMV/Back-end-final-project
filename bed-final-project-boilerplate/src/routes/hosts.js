import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import getHostById from "../services/hosts/getHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const { name } = req.query;
        const hosts = await getHosts(name);
        res.json(hosts);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { username, password, name, email, phoneNumber, profilePicture, aboutMe} = req.body;
        const newHost = await createHost(username, password, name, email, phoneNumber, profilePicture, aboutMe);
        res.status(201).json(newHost);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const host = await getHostById(id);

        res.status(200).json(host);
    } catch (error) {
        next(error);
    }
});


router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const host = await deleteHostById(id);

        res.status(200).json({
            message: `host with id ${id} was deleted!`
        })
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;
        const host = await updateHostById(id, { username,password,name,email,phoneNumber,profilePicture,aboutMe })
        res.status(200).json(host)
    } catch (error) {
        next(error);
    }
});

export default router;