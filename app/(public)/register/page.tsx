import Link from "next/link";
import { RegistrationForm } from "./RegisterForm";

export default function RegisterPage() {
    return (
        <main className="flex items-center justify-center">
            <div className="w-full max-w-md p-6 border rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6">Register</h1>
                <RegistrationForm />
                <p className="text-right">Already have an account? <Link className="text-slate-600 font-medium underline transition-colors duration-200 ease-in-out  " href="/login">Login</Link></p>
            </div>
        </main>
    );
}
