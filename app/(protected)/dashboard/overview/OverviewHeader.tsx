import { Badge } from "@/components/ui/badge";

export default function OverviewHeader({ role = "User" }: { role?: string }) {
    return (
        <div className="flex justify-between items-center bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Overview
                </h2>
                <p className="text-muted-foreground mt-1">Welcome back to your travel dashboard</p>
            </div>
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/5 text-primary">
                Role: {role}
            </Badge>
        </div>
    );
}
