import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";


export const authOptions = {

    providers : [
        CredentialsProvider({

            name : "Credentials",
            credentials : {
                email: {},
                password : {}
            },

            async authorize(credentials){
                const {email, password} = credentials


                await connectDB()
                // Only find returns just an array

                const user = await User.findOne({email: credentials.email})
                if(!user){
                return null;
                }

                const isMatch = await bcrypt.compare(credentials.password, user.password)
                if(!isMatch){
                    return null;
                }
                return{
                    id : user._id,
                    name : user.name,
                    email : user.email
                }

                
            }
        })

    ],
    session:{
        strategy : "jwt"
    },
    callbacks:{
        async jwt ({token, user }){
            
            if (user){
                token.id = user.id
            }
            return token
        },

        async session({session, token}){
            session.user.id = token.id
            return session
        }
    }


}

const handler = NextAuth(authOptions)

export {handler as GET , handler as POST}