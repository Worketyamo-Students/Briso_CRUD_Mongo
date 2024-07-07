import { Request, Response } from "express";
import { HttpCode } from "../core/constants";
import { PrismaClient } from "@prisma/client";
//import bcrypt from 'bcrypt'
//import sendMail from "../core/config/send.mail";
//import jwt from 'jwt'

import chalk from "chalk"

const prisma = new PrismaClient()

// creation of objects of functions
const Contolleurs = {
    getallCertifications: async (req: Request, res: Response) => {
        try {
            const certifications = await prisma.certification.findMany()
            res.send(certifications).status(HttpCode.OK)
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    getoneCertification: async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const find = await prisma.certification.findUnique({
                where: {
                    certification_id: id
                }
            })
            if (find) {
                res.json(find).status(HttpCode.OK)
                console.log(chalk.blueBright("Student successfully retrieved"))
            } else res.send({ "message": "Student not found" })
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    createCertification: async (req: Request, res: Response) => {
        try {
            const { title, description, date_issued } = req.body
            const newCertification = prisma.certification.create({
                data: {
                    title,
                    description,
                    date_issued
                }
            })
            if (newCertification) {
                res.json(newCertification).status(HttpCode.CREATED)
                console.log(chalk.blueBright("Project successfully created"))
            } else res.send({ msg: "could not create certification" })
        } catch (error) {
            console.log(error)
        }
    },
    modifyCertification: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { title, description, date_issued } = req.body
            const updateCertification = await prisma.certification.update({
                where: {
                    certification_id: id
                },
                data: {
                    title,
                    description,
                    date_issued
                },
            })
            if (updateCertification) {
                res.json({ "message": "student's info successfully modify" })
                console.log(updateCertification)
            }
            else res.send({ msg: "could not create certification" })
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    deleteoneCertification: async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const deleteCertification = await prisma.certification.delete({
                where: {
                    certification_id: id
                },
            })
            if (deleteCertification)
                res.json({ "message": "student successfully deleted" })
            else res.send({ msg: "could not create certification" })
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
}

export default Contolleurs;