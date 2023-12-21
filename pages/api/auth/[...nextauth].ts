import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import {app} from "../../../firebase"

import { GOOGLE_ID, GOOGLE_SECRET, NEXTAUTH_SECRET } from "../../../firebase";
export default NextAuth({
  // secret: NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        Email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log(process.env.NEXTAUTH_SECRET)
        console.log("Inside the Authorize Function1")

        const auth = getAuth(app);
        console.log("Inside the Authorize Function2")

        try {
          console.log("Inside the Authorize Function3")
          const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          const user = userCredential.user;
          const firebaseToken = await user.getIdToken();
          console.log("Inside the Authorize Function4")

          // Return user details for NextAuth session
          return {
            id: user.uid,
            name: user.displayName || user.email,
            email: user.email,
            token: firebaseToken
          };
        } catch (error) {
          throw new Error('Invalid credentials');
        }
      }
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  // for Ref in the future, cuz I know you will keep shooting yourself in the foot again and again
  // updates for the nextAuth and the session obj won't show up less you log out and log in again
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const auth = getAuth(app);
      // Check the provider type
      if (account.provider === 'google') {
        console.log('Inside Google provider check'); // Add this line for

        // Firebase Google Authentication

        try {
          const credential = GoogleAuthProvider.credential(account.id_token);
          console.log('ID Token:', account.idToken); // Add this line for debugging
          console.log('credential:', credential); // Add this line for debugging

          const firebaseUserCredential = await signInWithCredential(auth, credential);
          const firebaseUser = firebaseUserCredential.user;
          const firebaseToken = await firebaseUser.getIdToken();

          // Return user details for NextAuth session
          return {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email,
            email: firebaseUser.email,
            token: firebaseToken
          };
        } catch (error) {
          console.error('Firebase signInWithCredential error:', error);
          throw new Error('Failed to authenticate with Firebase', error.message);
        }

      }
      return true;
      // Handle other providers or credentials login
      // ...
    },

    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user.id; // Add the user ID
        token.firebaseToken = user.token; // Add the Firebase token
      }
      return token;
    },

    session: async ({ session, token }) => {
      if (token) {
        session.user.uid = token.uid; // Include the user ID in the session
        session.user.token = token.firebaseToken; // Include the Firebase token in the session
      }
      return session;
    },
  },

});
