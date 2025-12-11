import Link from "next/link";
import { LoginForm } from "./LoginForm";


export default function LoginPage() {
    return (
        <main className="flex  flex-1 items-center justify-center">
            <div className="w-full max-w-md p-6 border rounded-lg shadow-lg space-y-4">
                <h1 className="text-2xl font-bold ">Login</h1>
                <LoginForm />
                <p className="text-right">Don't have an account? <Link className="text-slate-600 font-medium underline transition-colors duration-200 ease-in-out  " href="/register">Register</Link></p>
            </div>
        </main>
    );
}
