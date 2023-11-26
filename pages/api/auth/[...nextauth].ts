import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

import {GOOGLE_ID, GOOGLE_SECRET} from "../../../firebase";
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                Email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials:any) => { // todo: change any
                console.log("Login in process")
                console.log("Credentials received:", credentials);
                const isLoginSuccessful = (credentials.email === "test@example.com" && credentials.password === "123");
                console.log("Is login successful?", isLoginSuccessful);

                // Mocking a successful authentication
                if (credentials.email === "test@example.com" && credentials.password === "123") {
                    console.log("LoginSuccess")
                    return {id: "123", name: "Test User", email: "test@example.com", image: null};
                } else {
                    return null;
                }
            }
        })

    ],
    session:{
        strategy:"jwt"
    },
    pages:{
        signIn:"/login"
    },
    // for Ref in the future, cuz I know you will keep shooting yourself in the foot again and again
    // updates for the nextAuth and the session obj won't show up less you log out and log in again
    callbacks:{
        async jwt({token, user}) {
            return {...token, ...user};
        },
        async session({session, token}) {
            session.user = token
            return session;
        },
    },
})
