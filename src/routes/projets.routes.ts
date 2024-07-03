import { Router } from "express";
import Contolleurs from "../controlleurs/projets.controlleurs";

const router = Router()

// CRUD Operations:

// GET method 1
router.get("/projets",Contolleurs.getallProjects)
// GET method 2
router.get("/projets/:id",Contolleurs.getoneProject)
// CREATE method
router.post("/projets",Contolleurs.createProject)
// UPDATE method
router.put("/projets/:id",Contolleurs.modifyProject)
// DELETE method 1
router.delete("/projets/:id",Contolleurs.deleteoneProject)
// DELETE method 2
router.delete("/projets",Contolleurs.deleteManyProject)

export default router