import { Response } from "express";
import chalk from "chalk";
import { HttpCode } from ".";

const sendError = (res:Response,error) =>{
    console.error(chalk.red(error))
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({"message": "An error ocured during the process" })
}

export default sendError;