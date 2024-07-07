import { Request, Response } from "express";
import { HttpCode } from "../core/constants";
import { PrismaClient } from "@prisma/client";
import chalk from "chalk"

const prisma = new PrismaClient()

// creation of objects of functions
const Contolleurs = {
    getallProjects: async (req: Request, res: Response) => {
        try {
            const projets = await prisma.project.findMany()
            res.send(projets).status(HttpCode.OK)
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    getoneProject: async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const find = await prisma.project.findUnique({
                where: {
                    project_id: id
                }
            })
            if (find) {
                res.json(find).status(HttpCode.OK)
                console.log(chalk.blueBright("Project successfully retrieved"))
            }
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    createProject: async (req: Request, res: Response) => {
        try {
            const { title, description } = req.body
            const project = await prisma.project.create({
                data: {
                    title,
                    description,
                }
            })
            if (project) {
                res.json(project).status(HttpCode.CREATED);
                console.log(chalk.blueBright("Project successfully created"))
            } else res.send({ msg: "could not create certification" })
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    modifyProject: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { title, description } = req.body
            const updateProject = await prisma.project.update({
                where: {
                    project_id: id
                },
                data: {
                    title,
                    description
                },
            })
            if (updateProject) {
                res.json(updateProject).status(HttpCode.OK)
                console.log(chalk.blueBright("Project successfully updated"))
            }
            else res.send({ msg: "could not create certification" })
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    deleteoneProject: async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const deleteProjet = await prisma.project.delete({
                where: {
                    project_id: id
                },
            })
            if (deleteProjet)
                res.json("Project successfully deleted").status(HttpCode.OK)
            else res.send({ msg: "could not create certification" })
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
}

export default Contolleurs