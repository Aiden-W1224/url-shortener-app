'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    username: z.string().min(1, "Username is required").max(50),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Password confirmation is required")
})
.refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
});

const SignUpForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
      });

    const onSubmit = async (values:z.infer<typeof formSchema>) => {
        const response = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password
            })
        })

        if(response.ok) {
            router.push("/sign-in");
        } else {
            console.error("Registration failed");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="text-center">Sign up to use our URL shortener</div>
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
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
                            <Input type="password" placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="password" placeholder="Re-Enter Password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button className="w-full" type="submit">Sign Up</Button>
            </form>
            <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                or
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
                If you already have an account, please&nbsp;
                <Link className="text-blue-500"href='sign-in'>Sign in</Link>
            </p>
        </Form>
      )
};

export default SignUpForm;