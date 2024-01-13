// Import necessary modules and dependencies
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),

    // Set the secret for signing and encrypting tokens (read from environment variable)
    secret: process.env.NEXTAUTH_SECRET,

    // Configure the session strategy to use JWT (JSON Web Tokens)
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/sign-in"
    },

    // Configure authentication providers (in this case, using CredentialsProvider)
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter email" },
                password: { label: "Password", type: "password" }
            },
            
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Retrieve user from the database based on the provided email
                const existingUser = await db.user.findUnique({
                    where: { email: credentials?.email }
                });

                if (!existingUser) {
                    return null;
                }

                // Compare the provided password with the hashed password in the database using bcrypt
                const passwordMatch = await compare(credentials.password, existingUser.password);

                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: `${existingUser.id}`,
                    username: existingUser.username || "",
                    email: existingUser.email,
                    admin: existingUser.admin
                };
            }
        })
    ],

    // Configure callback functions for JWT and session handling
    callbacks: {
        // Callback function for processing JWT tokens
        async jwt({ token, user }) {
            // If user exists and has an 'admin' property, add username and admin to the token
            if (user && 'admin' in user) {
                return {
                    ...token,
                    username: user.username,
                    admin: user.admin || false,
                };
            }
            return token;
        },

        // Callback function for processing user sessions
        async session({ session, token }) {
            // Update the session user object with information from the token
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username,
                    admin: token.admin
                }
            };
        },
    }
};
