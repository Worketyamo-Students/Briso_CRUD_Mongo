import { Router } from "express";
import Contolleurs from "../controlleurs/user.controlleurs";
import middleware from "../middleware/middleware.mid";

const routerUser = Router()

// CRUD Operations:

// GET method 1
routerUser.get("/admin/:id",middleware.roleUser,Contolleurs.getallUsers) //geting all users if superadmin
routerUser.get("/refresh/:id",Contolleurs.refreshToken) //refresh a token
// CREATE method
routerUser.post("/",Contolleurs.createUser) //creation of users
routerUser.post("/otp-verification", Contolleurs.verifyOTP) //verification through otp
routerUser.post("/login", Contolleurs.loginUser) //login of users
// UPDATE method
routerUser.put("/:id",Contolleurs.modifyUser)
// DELETE method 1
routerUser.delete("/:id",Contolleurs.deleteoneUser) //deleting one user
routerUser.delete("/",Contolleurs.deleteUsers) //deleting many users
export default routerUser