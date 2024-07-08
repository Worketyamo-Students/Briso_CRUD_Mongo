import  Jwt  from "jsonwebtoken";
import { envs } from "./env";

const tokenOps ={
    createToken : ()=>{
        return Jwt.sign(payload,envs.JWT_ACCESS_TOKEN,{expiresIn: '1h'})
    },
    verifyAccessToken : (token:string) =>{
        return Jwt.verify(token,envs.JWT_ACCESS_TOKEN)
    },
    decodeAccessToken : (token:string)=>{
        return Jwt.decode(token)
    }
}

export default tokenOps