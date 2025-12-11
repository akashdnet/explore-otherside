"use client";

import { getMyTrips, TripQueryParams } from "@/actions/trip";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import CreateTripModal from "./CreateTripModal";
import TableSearch from "./TableSearch";
import TripTable from "./TripTable";

export default function TableComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const getParam = (key: string, fallback: string) => searchParams.get(key) || fallback;

    const page = parseInt(getParam("page", "1"), 10);
    const limit = parseInt(getParam("limit", "5"), 10);
    const term = getParam("term", "").toLowerCase();
    const sortBy = getParam("sortBy", "createdAt");
    const sortOrder = getParam("sortOrder", "desc") as "asc" | "desc";

    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<any>(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [searchTerm, setSearchTerm] = useState(term);
    const [debouncedSearchTerm] = useDebounce(searchTerm, 700);

    // Track if this is the first render
    const isFirstRender = useRef(true);

    // Update URL when debounced search term changes (skip first render)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1");
        if (debouncedSearchTerm) {
            params.set("term", debouncedSearchTerm);
        } else {
            params.delete("term");
        }
        router.push(`?${params.toString()}`);
    }, [debouncedSearchTerm]);

    useEffect(() => {
        const fetchTrips = async () => {
            setIsLoading(true);
            setIsError(false);
            try {
                const params: TripQueryParams = {
                    page,
                    limit,
                    search: term || undefined,
                    sortBy,
                    sortOrder,
                };
                const result = await getMyTrips(params);
                setData(result);
            } catch (err) {
                setIsError(true);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrips();
    }, [page, limit, term, sortBy, sortOrder, refreshTrigger]);

    const trips = data?.data?.items || [];
    const meta = data?.data?.pagination;

    if (isLoading) {
        return (
            <div className="w-full max-w-5xl mx-auto p-3 md:p-4 bg-white shadow-md rounded-xl space-y-4 flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-sm text-gray-500">Loading trips...</p>
                </div>
            </div>
        );
    }

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(newPage));
        router.push(`?${params.toString()}`);
    };

    const handleSearchChange = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handleLimitChange = (newLimit: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1");
        params.set("limit", newLimit);
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-3 md:p-4 bg-white shadow-md rounded-xl space-y-4">

            {isError && <h1 className="text-center text-red-600 font-semibold text-xl ">{JSON.stringify(error)}</h1>}

            <div className="flex justify-between items-center gap-4 flex-col sm:flex-row">
                <Button
                    onClick={() => setCreateModalOpen(true)}
                    className="w-full sm:w-auto sm:min-w-[140px] font-semibold shadow-md"
                >
                    <span className="mr-2">+</span>
                    Add Trip
                </Button>
                <TableSearch term={searchTerm} handleSearchChange={handleSearchChange} />
            </div>

            <TripTable
                data={trips}
                isLoading={isLoading}
                onRefresh={() => setRefreshTrigger(prev => prev + 1)}
            />

            <div className="flex gap-4 border-t pt-4 justify-between items-center md:flex-row flex-col">
                {/* 🔹 Rows per page */}
                <div className="flex items-center gap-2">
                    <label htmlFor="limit" className="text-sm text-gray-600">
                        Rows per page:
                    </label>
                    <select
                        id="limit"
                        className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={limit}
                        onChange={(e) => handleLimitChange(e.target.value)}
                    >
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="10">10</option>
                    </select>
                </div>

                {/* 🔹 Pagination */}
                <div className="flex items-center gap-2 justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        Previous
                    </Button>

                    <div className="text-sm text-gray-600 text-center">
                        Page {page} of {meta?.totalPages || 1}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === meta?.totalPages || !meta?.totalPages}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>

            <CreateTripModal
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                onSuccess={() => {
                    setCreateModalOpen(false);
                    setRefreshTrigger(prev => prev + 1);
                }}
            />
        </div>
    );
}
