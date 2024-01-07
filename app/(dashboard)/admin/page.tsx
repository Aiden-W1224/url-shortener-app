import ShortenForm from "@/app/components/ShortenForm";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
    const session = await getServerSession(authOptions);
    if(session?.user) {
        return (
        <>
            <h2>Admin page - welcome back {session?.user.username}</h2>
            <ShortenForm />
            <Button>View Analytics</Button>
        </>
    )};
    return (
        <h2>Login to see this admin page</h2>
    )
};

export default page;