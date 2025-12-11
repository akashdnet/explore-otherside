
"use client";

import { getAllUsers } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import TableSearch from "../my-trip-management/TableSearch"; // Reusing existing search component
import UserTable from "./UserTable";

export default function UserManagementClient() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const getParam = (key: string, fallback: string) => searchParams.get(key) || fallback;

    const page = parseInt(getParam("page", "1"), 10);
    const limit = parseInt(getParam("limit", "5"), 10);
    const term = getParam("term", "").toLowerCase();

    const [{ items: users, pagination: meta }, setData] = useState<any>({
        users: [],
        meta: {
            page: 1,
            limit: 5,
            totalPages: 1,
            totalItems: 0,
        }
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<any>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [searchTerm, setSearchTerm] = useState(term);
    const [debouncedSearchTerm] = useDebounce(searchTerm, 700);

    const isFirstRender = useRef(true);

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
        const fetchUsers = async () => {
            setIsLoading(true);
            setIsError(false);
            try {
                const params = {
                    page,
                    limit,
                    search: term || undefined,
                };
                const result = await getAllUsers(params);
                setData(result.data);
                console.log(result?.data)
            } catch (err) {
                setIsError(true);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [page, limit, term, refreshTrigger]);

    // const users = data?.items || [];
    // const meta = data?.pagination;

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
        <div className="w-full max-w-6xl mx-auto bg-white shadow-md rounded-xl space-y-4 p-4">

            {isError && <h1 className="text-center text-red-600 font-semibold text-xl ">{JSON.stringify(error)}</h1>}

            <div className="flex justify-between items-center gap-4 flex-col sm:flex-row">
                {/* Placeholder for Add User if needed, currently just search on right */}
                <div className="w-full sm:w-auto"></div>
                <TableSearch term={searchTerm} handleSearchChange={handleSearchChange} />
            </div>

            <UserTable
                data={users}
                isLoading={isLoading}
                onRefresh={() => setRefreshTrigger(prev => prev + 1)}
            />

            <div className="flex gap-4 border-t pt-4 justify-between items-center md:flex-row flex-col">
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
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>

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
        </div>
    );
}
