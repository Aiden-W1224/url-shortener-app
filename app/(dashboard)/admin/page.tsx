import ShortenForm from "@/app/components/ShortenForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
    const session = await getServerSession(authOptions);
    console.log("start")
    console.log(session);
    console.log("end")
    if(session?.user && 'admin' in session.user) {
        return (
            <>
                <h2>Welcome to my URL shortener: {session?.user.username}!</h2>
                <ShortenForm />
            </>
    )};
    return (
        <h2 className="flex items-center justify-center h-screen">Login to shorten a url!</h2>
    )
};

export default page;