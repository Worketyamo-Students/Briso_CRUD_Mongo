import  Jwt  from "jsonwebtoken";
import { envs } from "./env";

const tockenOps ={
    createTocken : ()=>{
        Jwt.sign(payload:any,envs.JWT_TOCKEN)
    },
    verifyTocken : () =>{

    },
    decodeTocken : ()=>{

    }
}

export default tockenOps