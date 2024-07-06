import { Router } from "express";
import Contolleurs from "../controlleurs/students.controlleurs";

const routerStudent = Router()

// CRUD Operations:

// GET method 1
routerStudent.get("/",Contolleurs.getallStudents)
// GET method 2
routerStudent.get("/query",Contolleurs.getoneStudent)
// CREATE method
routerStudent.post("/",Contolleurs.createStudent)
// UPDATE method
routerStudent.put("/:id",Contolleurs.modifyStudent)
// DELETE method 1
routerStudent.delete("/:id",Contolleurs.deleteoneStudent)

export default routerStudent