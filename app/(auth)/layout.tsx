import { FC, ReactNode } from "react"

interface AuthLayloutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayloutProps> = ({children}) => {
    return (
        <div className="bg-slate-200 p-10 rounded-md">{children}</div>
    )
}

export default AuthLayout