import ShortenForm from "@/app/components/ShortenForm";
import { Button } from "@/components/ui/button";
import { db } from "@/lib";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
    const session = await getServerSession(authOptions);
    console.log("start")
    console.log(session);
    console.log("end")
    if(session?.user && 'admin' in session.user) {
        const isAdmin = session?.user.admin || false;
        return (
            <>
                <h2>Landing page - welcome back {session?.user.username}</h2>
                <ShortenForm />
                {isAdmin && <Button>View Analytics</Button>}
            </>
    )};
    return (
        <h2>Login to see this admin page</h2>
    )
};

export default page;