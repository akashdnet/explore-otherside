"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
}

export default function Pagination({ totalItems, itemsPerPage, currentPage }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const updatePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
    };

    const updateLimit = (limit: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("limit", limit);
        params.set("page", "1"); // Reset to page 1 on limit change
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex justify-between items-center pt-4">
            <div className="flex items-center gap-2">
                <span>Per page:</span>
                <select
                    className="border rounded px-2 py-1"
                    value={itemsPerPage}
                    onChange={(e) => updateLimit(e.target.value)}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => updatePage(currentPage - 1)}
                >
                    Previous
                </Button>
                <span>Page {currentPage} of {totalPages || 1}</span>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={() => updatePage(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
