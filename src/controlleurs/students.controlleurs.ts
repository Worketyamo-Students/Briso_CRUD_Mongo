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
    getallStudents: async (req: Request, res: Response) => {
        try {
            const students = await prisma.student.findMany()
            res.send(students).status(HttpCode.OK)
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    getoneStudent: async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const find = await prisma.student.findUnique({
                where: {
                    student_id: id
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
    createStudent: async (req: Request, res: Response) => {
        try {
            const {age,cni, address, phone, tutor, school_level, status,userId } = req.body

            const student = await prisma.student.create({
                // need to be fixed while taking into account other fieelds
                 data: {
                    age,
                    cni,
                    address,
                    phone,
                    tutor,
                    school_level,
                    status,
                    userId
                }
            })
            res.json({ "message": "student successfully created" })
            console.log(student)
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    modifyStudent: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const {age,cni, address, phone, tutor, school_level, status } = req.body
            const updateStudent = await prisma.student.update({
                where: {
                    student_id: id
                },
                data: {
                    age,
                    cni,
                    address,
                    phone,
                    tutor,
                    school_level,
                    status
                },
            })
            if (updateStudent) {
                res.json({ "message": "student's info successfully modify" })
                console.log(updateStudent)
            }
            else
                console.log("not working")
            console.error("not working")
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
    deleteoneStudent: async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const deleteStudent = await prisma.student.delete({
                where: {
                    student_id: id
                },
            })
            if (deleteStudent)
                res.json({ "message": "student successfully deleted" })
            else
                console.error("not working")
        } catch (error) {
            console.error(chalk.red(error))
        }
    },
}

export default Contolleurs;