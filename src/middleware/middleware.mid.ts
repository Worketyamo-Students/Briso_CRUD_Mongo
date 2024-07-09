import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { HttpCode } from "../core/constants";
import sendError from "../core/constants/errors";

const prisma = new PrismaClient();
const middleware = {
    // verification of user's role
    roleUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params

            const user = await prisma.user.findUnique({
                where: {
                    user_id: id
                }
            })
            if (user && user.role === "SUPERADMIN") next()
            else res.json({ "msg": "Action not authorised" }).status(HttpCode.FORBIDDEN)
        } catch (error) {
            sendError(res, error)
        }
    },
    // verifyToken: (req: Request, res: Response, next: NextFunction) => {
    //     const prisma = new PrismaClient()

    // },
}

export default middleware