import { Request,Response } from "express";
import { HttpCode } from "../core/constants";
import {PrismaClient } from "@prisma/client";
import chalk from "chalk"

const prisma = new PrismaClient()

// creation of objects of functions
const Contolleurs = {
    getallProjects : async (req:Request,res:Response)=>{
        try {
            const projets = await prisma.projet.findMany()
            res.send(projets).status(HttpCode.OK)
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    getoneProject : async (req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const find = await prisma.projet.findUnique({
                where: {
                    projet_id : id 
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
    createProject : async (req:Request,res:Response)=>{
        try {
            const {title,description} = req.body
            const projet = await prisma.projet.create({
                data : {
                    title,
                    description,
                }
            })
            await res.json(projet).status(HttpCode.CREATED);
            console.log(chalk.blueBright("Element successfully created"))
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    modifyProject : async (req: Request,res : Response)=>{
        try {
            const {id} = req.params
            const {title,description} = req.body
            const updateProjet = await prisma.projet.update({
                where : {
                    projet_id : id
                },
                data : {
                    title,
                    description                    
                },
            })
            if(updateProjet){
                await res.json(updateProjet).status(HttpCode.OK)
                console.log(chalk.blueBright("Element successfully updated"))
            }
            else
                console.log("not working")
                await console.error("not working")          
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    deleteoneProject : async (req: Request,res : Response)=>{
        try {
            const {id} = req.params
            
            const deleteProjet = await prisma.projet.delete({
                where : {
                    projet_id : id
                },
            })
            if(deleteProjet)
                await res.json("successfully deleted").status(HttpCode.OK)
            else
                await console.error("not working")
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
}

export default Contolleurs