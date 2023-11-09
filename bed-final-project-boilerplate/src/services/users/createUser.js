import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../errors/BadRequestError.js";

const createUser = async ( username, password, name, email, phoneNumber, profilePicture ) => {
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

    if (missingFields.length > 0) {
        throw new BadRequestError(`The following fields are required to create a user: ${missingFields.join(', ')}`);
    }


    const newUser = {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture
    };

    const prisma = new PrismaClient();
    const user = await prisma.user.create({
        data: newUser,
    });

    return user
}

export default createUser;