import { Request, Response } from "express";
import { HttpCode } from "../core/constants";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import sendError from "../core/constants/errors";
import chalk from "chalk"
//import { regex } from "../core/config/env";
import sendMail from "../core/config/send.mail";
import { otpGenerate } from "../core/config/otp_generator";
import tokenOps from "../core/config/tocken.function";
//import cookieParser from "cookie-parser";


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
            const { name, email, password } = req.body

            // validating user's input
            if (!name || !email || !password)
                res.status(HttpCode.BAD_REQUEST).json({ "msg": "veillez remplir ces champs" })
            // validating input data
            // const validateMail = regex.testRegex(regex.EMAIL_REGEX, email)
            // const validatePass = regex.testRegex(regex.PASSWORD_REGEX, password)
            // if (!validateMail || !validatePass) res.json({ msg: "Veillez entrez des informations valides" })

            // hashing the password
            const passHash = await bcrypt.hash(password, 12)

            const code_otp = parseInt(otpGenerate())
            const otpExpiredAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: passHash,
                },
            })
            const updateUser = await prisma.user.update({
                where: {
                    email: user.email
                },
                data: {
                    code_otp,
                    otpExpiredAt,
                },
            })
            if (user) {
                sendMail(email, "This is an anonymous connection!", `<h1 style=color:blue>Here is your code of validation :</h1> ${code_otp}`)
                res.json({ "message": "user successfully created" })
                console.log(updateUser)
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
            if (user != null) {
                const actual_time = new Date(Date.now() + 5 * 60 * 1000).toISOString()
                if (user.code_otp != null) {
                    if (user.otpExpiredAt.toISOString() < actual_time) return res.json({ msg: "OTP code expired" }).status(HttpCode.UNAUTHORIZED)

                    if (user.code_otp === code_otp) {
                        const userUpdate = await prisma.user.update({
                            where: {
                                email: user.email
                            },
                            data: {
                                code_otp: null
                            }
                        });
                        res.json({ msg: 'OTP verified successfully' })
                        console.log(userUpdate)
                    }
                } else console.log("no otp registered")
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
                if (testPass) {
                    const token = tokenOps.createToken(user)
                    user.password = ""
                    res.cookie("Briso's connection", token, { httpOnly: true, secure: true })
                    res.json({ msg: "User successfully logged in"}).status(HttpCode.OK)
                    console.log(user)
                } else res.send("Wrong password entered,retry again")
            } else console.log(chalk.red("No user found"))
        } catch (error) {
            sendError(res, error)
        }
    },
    refreshToken : async(req:Request,res:Response) =>{
        try {
            const {id} = req.params
            
            const user = await prisma.user.findFirst({
                where: {
                    user_id: id
                },
            })
            //const refreshToken = cookieParser.signedCookie(user,secret)
            const refreshToken = tokenOps.createToken(user)
            const decodedPayload = tokenOps.decodeAccessToken(refreshToken)
            if(decodedPayload && 'email' in decodedPayload){
                res.cookie("Briso's connection", refreshToken, { httpOnly: true, secure: true })
                res.json({ msg: "Welcome back to worketyamo's plateform" }).status(HttpCode.OK)
                const payloadEmail = decodedPayload.email;
                console.log(payloadEmail);              
            }
        } catch (error) {
            sendError(res,error)
        }
    },
    // RegisterUser : async(req:Request, res:Response) =>{
    //     try {
    //          //utilisez pour creer un otp
    //     } catch (error) {
    //         console.error(chalk.red(error))
    //     }
    // }
}
export default Contolleurs;