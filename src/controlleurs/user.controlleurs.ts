import { Request, Response } from "express";
import { HttpCode } from "../core/constants";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import sendError from "../core/constants/errors";
import chalk from "chalk"
import { regex } from "../core/config/env";
import sendMail from "../core/config/send.mail";
import { otpGenerate } from "../core/config/otp_generator";

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
    getoneUser: async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const find = await prisma.user.findUnique({
                where: {
                    user_id: id
                }
            })
            if (find) {
                res.json(find).status(HttpCode.OK)
                console.log(chalk.blueBright("user successfully retrieved"))
            } else res.send({ "message": "User not found" })
        } catch (error) {
            sendError(res, error)
        }
    },
    createUser: async (req: Request, res: Response) => {
        try {
            const { name, email, password,otp } = req.body
            
            // validating user's input
            if (!name || !email || !password)
                res.status(HttpCode.BAD_REQUEST).json({ "msg": "veillez remplir ces champs" })
            // validating input data
            // const validateMail = regex.testRegex(regex.EMAIL_REGEX, email)
            // const validatePass = regex.testRegex(regex.PASSWORD_REGEX, password)
            // if (!validateMail || !validatePass) res.json({ msg: "Veillez entrez des informations valides" })

            // hashing the password
            const passHash = await bcrypt.hash(password, 12)

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: passHash,
                    otp 
                },
            })
            if (user) {
                if (user.otp != null) {
                    const code = parseInt(otpGenerate())
                    sendMail(email, "This is an anonymous connection!", `<h1 style=color:blue>Here is your code of validation :</h1> ${code}`)
                    res.json({ "message": "user successfully created" })
                    user.otp.code = code
                    console.log(user)
                }else console.log("otp null")
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
        const { otp, email } = req.body

        const user = await prisma.user.findFirst({
            where: {
                email
            },
        })
        if (user != null) {
            const date = new Date().toISOString()
            if (user.otp != null) {
                if (user.otp.expiry_date.toISOString() < date) return res.json({ msg: "OTP code expired" }).status(HttpCode.UNAUTHORIZED)

                if (user.otp?.code === otp && !user.otp?.expired) {
                    const userUpdate = await prisma.user.update({
                        where: {
                            user_id: user.user_id
                        },
                        data: {
                            otp: null
                        }
                    });
                    return res.json({ msg: 'OTP verified successfully' })
                    console.log(userUpdate)
                }
            } else console.log("no otp registered")
        } else {
            return res.json({ msg: "User's email not corresponding" }).status(HttpCode.NO_CONTENT)
        }
    },
    // loginUser : async(req:Request, res:Response) =>{
    //     try {
    //          //
    //     } catch (error) {
    //         console.error(chalk.red(error))
    //     }
    // },
    // RegisterUser : async(req:Request, res:Response) =>{
    //     try {
    //          //utilisez pour creer un otp
    //     } catch (error) {
    //         console.error(chalk.red(error))
    //     }
    // }
}
export default Contolleurs;