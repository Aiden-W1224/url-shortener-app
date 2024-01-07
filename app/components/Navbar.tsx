import { Button, buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { Divide } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import UserAccountNav from "./UserAccountNav";


const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return(
        <div className="bg-zinc-100 text-black py-2 border-b border-s-zinc-100 fixed w-full top-0">
            <div className="flex items-center justify-between pl-4 pr-4">
                <Link href="/">Url Shortener App</Link>
                {/* shadcn button styling */}
                {session?.user ? (<UserAccountNav/>) : (<Link className={buttonVariants()} href="/sign-in">Sign in</Link>)}
            </div>
        </div>
    );
};

export default Navbar;