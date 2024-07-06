import { Request,Response } from "express";
import { HttpCode } from "../core/constants";
import {PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import sendMail from "../core/config/send.mail";
//import jwt from 'jwt'

import chalk from "chalk"

const prisma = new PrismaClient()

// Implementing regex:
export const regex= {
    EMAIL_REGEX : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    PASSWORD_REGEX : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    testRegex : (email:string):boolean =>{
                    return regex.EMAIL_REGEX.test(email)
    },
    testRegex2 : (password:string):boolean =>{
                    return regex.PASSWORD_REGEX.test(password)
    }
}

// creation of objects of functions
const Contolleurs = {
    getallUsers : async (req:Request,res:Response)=>{
        try {
            const users = await prisma.user.findMany()
            res.send(users).status(HttpCode.OK)
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    getoneUser : async (req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const find = await prisma.user.findUnique({
                where: {
                    user_id : id 
                }
            })
            if(find){
                res.json(find).status(HttpCode.OK)
                console.log(chalk.blueBright("user successfully retrieved"))
            }else res.send({"message" : "User not found"})
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    createUser : async (req:Request,res:Response)=>{
        try {
            const {name,email,age,password,role} = req.body
            // if(!name || !email || !password)
            //     res.status(HttpCode.BAD_REQUEST).json({"msg": "veillez remplir ces champs"})

            // const isValidEmail = regex.testRegex(regex.testRegex(email))
            // const isValidPassword = regex.testRegex2(regex.PASSWORD_REGEX)

            // if(!isValidEmail || !isValidPassword)
            //     res.json({message : "Veillez entrez des informations valides "})
            
            // hashing the password
            const passHash = await bcrypt.hash(password,10)

            const user = await prisma.user.create({
                data : {
                    name,
                    email,
                    age,
                    password : passHash,
                    role
                }
            })
            sendMail(user.email)
            res.json({"message": "user successfully created"})
            console.log(user)
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    modifyUser : async (req: Request,res : Response)=>{
        try {
            const {id} = req.params
            const {name,email,age,password,role} = req.body
            const updateUser = await prisma.user.update({
                where : {
                    user_id : id
                },
                data : {
                    name,
                    email,
                    age,
                    password,
                    role                   
                },
            })
            if(updateUser){
                res.json({"message": "user's info successfully modify"})
                console.log(updateUser)
            }
            else
                console.log("not working")
                 console.error("not working")          
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    deleteoneUser : async (req: Request,res : Response)=>{
        try {
            const {id} = req.params
            
            const deleteUser = await prisma.user.delete({
                where : {
                    user_id : id
                },
            })
            if(deleteUser)
                res.json({"message": "user successfully deleted"})
            else
                 console.error("not working")
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
}

export default Contolleurs;