import Link from "next/link";
import { LoginForm } from "./LoginForm";


export default function LoginPage() {
    return (
        <main className="flex my-10 flex-1 items-center justify-center">
            <div className="w-full max-w-md p-6 border rounded-lg shadow-2xl space-y-4">
                <h1 className="text-center text-2xl font-bold "> Welcome Back | Login </h1>
                <LoginForm />
                <p className="text-right">Don't have an account? <Link className=" font-medium underline transition-colors duration-200 ease-in-out text-amber-500 hover:text-amber-600 " href="/register">Register</Link></p>
            </div>
        </main>
    );
}
