import { Suspense } from "react";
import UserManagementClient from "./UserManagementClient";

export default function UserManagementPage() {
    return (
        <section className="space-y-8 max-w-6xl md:p-6 p-3">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-3">
                User Management
            </h1>
            <Suspense fallback={
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-sm text-gray-500">Loading...</p>
                    </div>
                </div>
            }>
                <UserManagementClient />
            </Suspense>
        </section>
    );
}
