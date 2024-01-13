"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {signIn} from "next-auth/react"
import {useRouter } from "next/navigation";

//using zod for validation of data input
const formSchema = z.object({
   email: z.string().min(1, "Email is required").email("Invalid email"),
   password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters long")
});

const SignInForm = () => {
    //nextjs hook for navigation
    const router = useRouter();
    //z.infer to auto define the type from formSchema 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
      });

      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const signInData = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });
            console.log("SignInData:", signInData);

            if (signInData?.error) {
                console.error(signInData.error);
                window.alert("Sign-in failed. Please check your email and password.");
            } else {
                console.log("Authentication successful");
                router.refresh();
                router.push("/admin");
            }
        } catch (error) {
            console.error("An error occurred during authentication:", error);
        }
    };
    

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="text-center">Sign in to use our URL shortener</div>
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button className="w-full" type="submit">Sign In</Button>
            </form>
            <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                or
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
                If you don&apos;t have an account, please&nbsp;
                <Link className="text-blue-500"href='sign-up'>Sign up</Link>
            </p>
        </Form>
      )
};

export default SignInForm;