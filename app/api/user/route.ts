import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";

//Schema for input validation
const userSchema = z.object({
    username: z.string().min(1, "Username is required").max(50),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters long"),
});

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const {email, username, password} = userSchema.parse(body);

        //Handling for non-unique emails
        const emailExists = await db.user.findUnique({
            where: {email: email}
        });

        if(emailExists) {
            return NextResponse.json({user: null, message: "User with this email already exists"}, {status: 409})
        }

        //Handling for non-unique usernames
        const usernameExists = await db.user.findUnique({
            where: {username: username}
        });

        if(usernameExists) {
            return NextResponse.json({user: null, message: "This username already exists"}, {status: 409})
        }
        
        //Password hashing
        const hashedPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        //Removes password from response
        const {password: newUserPassword, ...rest} = newUser;

        return NextResponse.json({user: rest, message: "User created successfully"}, {status: 201});
    } catch(error) {
        return NextResponse.json({message: "An error has occurred."}, {status: 500});
    }
}