import UserManagementClient from "./UserManagementClient";

export default function UserManagementPage() {
    return (
        <section className="space-y-8 max-w-6xl md:p-6 p-3">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-3">
                User Management
            </h1>
            <UserManagementClient />
        </section>
    );
}
