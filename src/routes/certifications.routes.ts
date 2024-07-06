import { Router } from "express";
import Contolleurs from "../controlleurs/certifications.controlleurs";

const routerCertification = Router()

// CRUD Operations:

// GET method 1
routerCertification.get("/",Contolleurs.getallCertifications)
// GET method 2
routerCertification.get("/query",Contolleurs.getoneCertification)
// CREATE method
routerCertification.post("/",Contolleurs.createCertification)
// UPDATE method
routerCertification.put("/:id",Contolleurs.modifyCertification)
// DELETE method 1
routerCertification.delete("/:id",Contolleurs.deleteoneCertification)

export default routerCertification