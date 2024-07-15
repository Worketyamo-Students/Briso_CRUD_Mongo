import ejs from 'ejs'
import path from 'path'

export const sendOTP = async (otp :number) =>{
   try {
        const html = await path.join(__dirname,"otp.ejs")
        ejs.renderFile(html,{otp})
        
   } catch (error) {
        console.error("failed to send otp code")
   }
}