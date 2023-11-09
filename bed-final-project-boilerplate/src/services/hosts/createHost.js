import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../errors/BadRequestError.js";

const createHost = async (username, password, name, email, phoneNumber, profilePicture, aboutMe) => {    
    const missingFields = [];
    if (!username) {
        missingFields.push('username');
    }
    if (!password) {
        missingFields.push('password');
    }
    if (!name) {
        missingFields.push('name');
    }
    if (!email) {
        missingFields.push('email');
    }
    if (!phoneNumber) {
        missingFields.push('phone number');
    }
    if (!profilePicture) {
        missingFields.push('profile picture');
    }
    if (!aboutMe) {
        missingFields.push('about me');
    }

    if (missingFields.length > 0) {
        throw new BadRequestError(`The following fields are required to create a host: ${missingFields.join(', ')}`);
    }

    
    const newHost = {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe
    };



    const prisma = new PrismaClient();
    const host = await prisma.host.create({
        data: newHost
    });

    return host;
};

export default createHost;