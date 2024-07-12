import { Request, Response } from "express";
import { HttpCode } from "../core/constants";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import sendError from "../core/constants/errors";
import chalk from "chalk"
import sendMail from "../sentmail/send.mail";
import { otpGenerate } from "../core/config/otp_generator";
import tokenOps from "../core/config/jwt.function";
import { validationResult } from 'express-validator'
import { sendOTP } from "../sentmail/template.mail";

const prisma = new PrismaClient()

// creation of objects of functions
const Contolleurs = {
    getallUsers: async (req: Request, res: Response) => {
        try {
            const users = await prisma.user.findMany()
            res.send(users).status(HttpCode.OK)
        } catch (error) {
            sendError(res, error)
        }
    },
    createUser: async (req: Request, res: Response) => {
        try {
            const errorValidation = (req: Request, res: Response) => {
                const errors = validationResult(req)
                if (errors.isEmpty()) {
                    // in case request params meet the validation criteria
                    return res.status(HttpCode.OK).json(errors.array())
                }
                res.status(HttpCode.UNPROCESSABLE_ENTITY).json({ errors: errors.array() })
                console.log("errors found in user's entries")
            }
            errorValidation(req, res)

            const { name, email, password } = req.body
            // hashing the password
            const passHash = await bcrypt.hash(password, 12)

            const code_otp = otpGenerate()
            const expiredAt = new Date(Date.now() + 10 * 60 * 1000)
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: passHash,
                    otp: {
                        code: code_otp,
                        expiredAt
                    }

                },
            })
            if (user!=null) {
                const otpTemplate = sendOTP(user.otp?.code)
                sendMail(email, "This is an anonymous connection!", otpTemplate)
                console.log("It arrived here")
                res.json("User successfully created").status(HttpCode.OK)
            } else res.send({ msg: "could not create user" })
        } catch (error) {
            sendError(res, error)
        }
    },
    modifyUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { name, email, password, role } = req.body
            const updateUser = await prisma.user.update({
                where: {
                    user_id: id
                },
                data: {
                    name,
                    email,
                    password,
                    role
                },
            })
            if (updateUser) {
                res.json({ "message": "user's info successfully modify" })
                console.log(updateUser)
            }
            else res.send({ msg: "could not create certification" })
        } catch (error) {
            sendError(res, error)
        }
    },
    deleteoneUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const deleteUser = await prisma.user.delete({
                where: {
                    user_id: id
                },
            })
            if (deleteUser)
                res.json({ "message": "user successfully deleted" })
            else res.send({ msg: "could not create certification" })
        } catch (error) {
            sendError(res, error)
        }
    },
    deleteUsers: async (req: Request, res: Response) => {
        try {
            const deleteUsers = await prisma.user.deleteMany()
            if (deleteUsers)
                res.json({ "message": "all users successfully deleted" })
            else res.send({ msg: "could not delete users" })
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    verifyOTP: async (req: Request, res: Response) => {
        const { code_otp, email } = req.body

        try {
            const user = await prisma.user.findFirst({
                where: {
                    email
                },
            })
            const actual_time = new Date(Date.now())
            if (user?.otp != null) {
                    if (user.otp.code === code_otp || user.otp.expiredAt > actual_time) {
                        const userUpdate = await prisma.user.update({
                            where: {
                                email: user.email
                            },
                            data: {
                                otp: null
                            }
                        });
                        res.json({ msg: 'OTP verified successfully' })
                        console.log(userUpdate)
                    }
             
            } else {
                return res.json({ msg: "User's email not corresponding" }).status(HttpCode.NO_CONTENT)
            }
        } catch (error) {
            sendError(res, error)
        }
    },
    loginUser: async (req: Request, res: Response) => {
        const { email, password } = req.body

        try {
            const user = await prisma.user.findFirst({
                where: {
                    email
                },
            })
            if (user != null) {
                const testPass = await bcrypt.compare(password, user.password)
                if (testPass || user.otp?.code == null) {
                    //const accessToken = tokenOps.createToken(user)
                    const refreshToken = tokenOps.createToken(user)
                    user.password = ""
                    res.cookie("Briso's connection", refreshToken, { httpOnly: true, secure: true })
                    res.json({ msg: "User successfully logged in" }).status(HttpCode.OK)
                    console.log(user)
                } else res.send("Wrong password entered,retry again")
            } else console.log(chalk.red("No user found"))
        } catch (error) {
            sendError(res, error)
        }
    },
    refreshToken: async (req: Request, res: Response) => {
        try {
            // const cookies = req.cookies....
            // if(!cookie){
            //     res.status().json()
            // }
            // const decodedPayload = tokenOps.decodeAccessToken(ca doit etre refreshToken)
            // if(decodedPayload!==null){
            //const {user_id} = verify
            //...creer un user grace a prisma(en fonction du user_id) puis retirez le password si password est vide,creer un access token et faire un res.json a la fin
            //}
        } catch (error) {
            sendError(res, error)
        }
    },
    // function that directly load a user in plateform
    registerUser: async (res: Response) => {
        try {
            res.json({ msg: "welcome to worketyamo's plateform" }).status(HttpCode.OK)
            chalk.blueBright(console.log("A user has connecter"))
        } catch (error) {
            console.error(chalk.red(error))
        }
    }
}

export default Contolleurs;