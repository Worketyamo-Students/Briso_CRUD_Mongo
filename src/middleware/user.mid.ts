import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { HttpCode } from "../core/constants";
import tokenOps from "../core/config/jwt.function";
import sendError from "../core/constants/errors";

const prisma = new PrismaClient();

const userMid = {
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
    verifyUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken = req.headers.authorization
            const decodedPayload = tokenOps.decodeAccessToken(accessToken)
            //const user = token.verifyAccessTOken(accessToken)
            //req.user = user
            if (decodedPayload && 'name,email,password' in decodedPayload) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: decodedPayload.email
                    }
                })
                //if (user) next()
                //else res.json({ "msg": "User not found" }).status(HttpCode.UNAUTHORIZED)
        }
        } catch(error) {
        sendError(res, error)
    }

},
}

export default userMid