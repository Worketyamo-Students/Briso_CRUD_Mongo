import ejs from 'ejs'
import path from 'path'

export const sendOTP = async (otp):string =>{
    const pathOTP = await path.join(__dirname,'otp.ejs')
    ejs.renderFile(pathOTP, {otp},(str,error)=>{
        if(otp!=null) return str
        else throw error
    })
}