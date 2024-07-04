import { Request,Response } from "express";
import { HttpCode } from "../core/constants";
import {PrismaClient } from "@prisma/client";
import chalk from "chalk"

const prisma = new PrismaClient()

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
                console.log(chalk.blueBright("Element successfully retrieved"))
            }
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    createUser : async (req:Request,res:Response)=>{
        try {
            const {name,email,age,password,role} = req.body
            const user = await prisma.user.create({
                data : {
                    name,
                    email,
                    age,
                    password,
                    role
                }
            })
            res.json({"message": "element successfully created"})
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
                res.json({"message": "element successfully modify"})
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
                res.json({"message": "element successfully deleted"})
            else
                 console.error("not working")
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
}

export default Contolleurs