import { Router } from "express";
import Contolleurs from "../controlleurs/user.controlleurs";

const routerUser = Router()

// CRUD Operations:

// GET method 1
routerUser.get("/",Contolleurs.getallUsers)
// GET method 2
routerUser.get("/query",Contolleurs.getoneUser)
// CREATE method
routerUser.post("/",Contolleurs.createUser)
// UPDATE method
routerUser.put("/:id",Contolleurs.modifyUser)
// DELETE method 1
routerUser.delete("/:id",Contolleurs.deleteoneUser)

export default routerUser