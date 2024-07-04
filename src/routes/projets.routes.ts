import { Router } from "express";
import Contolleurs from "../controlleurs/projets.controlleurs";

const routerProject = Router()

// CRUD Operations:

// GET method 1
routerProject.get("/",Contolleurs.getallProjects)
// GET method 2
routerProject.get("/:id",Contolleurs.getoneProject)
// CREATE method
routerProject.post("/",Contolleurs.createProject)
// UPDATE method
routerProject.put("/:id",Contolleurs.modifyProject)
// DELETE method 1
routerProject.delete("/:id",Contolleurs.deleteoneProject)

export default routerProject