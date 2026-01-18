import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

const handler = NextAuth({
 providers:[
  
 ]
})

export { handler as GET, handler as POST }
