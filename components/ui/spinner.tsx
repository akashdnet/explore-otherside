
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Spinner({ className, ...props }: SpinnerProps) {
    return (
        <div className={cn("flex justify-center items-center w-full py-10", className)} {...props}>
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
}
