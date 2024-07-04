import { Router } from "express";
import Contolleurs from "../controlleurs/projets.controlleurs";

const router = Router()

// CRUD Operations:

// GET method 1
router.get("/",Contolleurs.getallProjects)
// GET method 2
router.get("/:id",Contolleurs.getoneProject)
// CREATE method
router.post("/",Contolleurs.createProject)
// UPDATE method
router.put("/:id",Contolleurs.modifyProject)
// DELETE method 1
router.delete("/:id",Contolleurs.deleteoneProject)

export default router