import { Input } from "@/components/ui/input";
import { FaSearchengin } from "react-icons/fa6";


export default function TableSearch({ term, handleSearchChange }: any) {
    return (
        <div className="flex justify-end">
            <div className="relative w-full sm:w-72">

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaSearchengin />
                </span>

                <Input
                    type="text"
                    placeholder="Search destination, type, or status..."
                    value={term}
                    onChange={handleSearchChange}
                    className="pl-9 pr-3 py-2 w-full rounded-lg border border-gray-300 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                     shadow-sm transition-all"
                />
            </div>
        </div>
    )
}
