"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function TripFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("term") || "");
    const [status, setStatus] = useState(searchParams.get("status") || "all");

    // Debounce search value to avoid too many URL updates
    const [debouncedSearch] = useDebounce(search, 300);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const currentSearch = params.get("term") || "";
        const currentStatus = params.get("status") || "all";

        // Only update if values actually changed
        if (debouncedSearch === currentSearch && status === currentStatus) {
            return;
        }

        if (debouncedSearch) {
            params.set("term", debouncedSearch);
        } else {
            params.delete("term");
        }

        if (status && status !== "all") {
            params.set("status", status);
        } else {
            params.delete("status");
        }

        // Reset page when filter changes (only if filter actually changed)
        if (debouncedSearch !== currentSearch || status !== currentStatus) {
            params.set("page", "1");
        }

        router.push(`?${params.toString()}`);
    }, [debouncedSearch, status, router, searchParams]);

    return (
        <div className="flex items-center justify-between gap-6">
            <Input
                placeholder="Search by title or guide name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-1/2"
            />

            <RadioGroup
                value={status}
                onValueChange={setStatus}
                className="flex gap-4 border border-gray-200 rounded-lg p-2"
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pending" id="pending" />
                    <Label htmlFor="pending">Pending</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="accepted" id="accepted" />
                    <Label htmlFor="accepted">Accepted</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="completed" id="completed" />
                    <Label htmlFor="completed">Completed</Label>
                </div>
            </RadioGroup>
        </div>
    );
}
