
 import zod, { email } from 'zod'
const registerSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password:zod.string().min(6)


});
 
const loginSchema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)  
})


export { registerSchema, loginSchema } 
