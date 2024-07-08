import { Request, Response } from "express";
import { HttpCode } from "../core/constants";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import sendError from "../core/constants/errors";
import chalk from "chalk"
import { regex } from "../core/config/env";
import { otpGenerate } from "../core/config/otp_generator";

const prisma = new PrismaClient()

// creation of objects of functions
const Contolleurs = {
    getallUsers: async (req: Request, res: Response) => {
        try {
            const users = await prisma.user.findMany()
            res.send(users).status(HttpCode.OK)
        } catch (error) {
            sendError(res,error)
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
            sendError(res,error)
        }
    },
    createUser: async (req: Request, res: Response) => {
        try {
            const { name, email, age, password } = req.body
            // validating user's input
             if(!name || !email || !password)
                 res.status(HttpCode.BAD_REQUEST).json({"msg": "veillez remplir ces champs"})
            // validating input data
            const corectMail = regex.testRegex(email)
            const correctPass = regex.testRegex2(password)
            if(!corectMail) res.json({msg: "Veillez respectez le format d'email demander"})
            if(!correctPass) res.json({msg: "Veillez respectez le format du mot de passe demander"})
            // hashing the password
            const passHash = await bcrypt.hash(password, 10)

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    age,
                    password : passHash,
                },
            })
            const otp = parseInt(otpGenerate())
            //sendMail(email, "This is an anonymous connection!", `Here is your code of validation: ${otp}`)
            if (user) {
                res.json({ "message": "user successfully created" })
                console.log(user)
            } else res.send({ msg: "could not create user" })
        } catch (error) {
           sendError(res,error)
        }
    },
    modifyUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { name, email, age, password, role } = req.body
            const updateUser = await prisma.user.update({
                where: {
                    user_id: id
                },
                data: {
                    name,
                    email,
                    age,
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
            sendError(res,error)
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
            console.error(chalk.red(error))
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
    // verifyOTP : async(req:Request, res:Response) =>{
    //     try {
    //          //
    //     } catch (error) {
    //         console.error(chalk.red(error))
    //     }
    // },
    // loginUser : async(req:Request, res:Response) =>{
    //     try {
    //          //
    //     } catch (error) {
    //         console.error(chalk.red(error))
    //     }
    // }
    // RegisterUser : async(req:Request, res:Response) =>{
    //     try {
    //          //utilisez pour creer un otp
    //     } catch (error) {
    //         console.error(chalk.red(error))
    //     }
    // }
}
export default Contolleurs;