import TourCardGroup from "@/components/TourCardGroup";
import { tours } from "@/utils/dummy-data";
import { PaginationComponent } from "./pagination";
import SearchSection from "./search-component/SearchSection";

export default function page() {
    return (
        <main className="leading-relaxed text-lg space-y-6">
            <div>
                <h1 className="text-4xl font-bold text-center text-[#FE9A00] ">Explore, Mach and Travel</h1>
                <p className="text-center text-slate-600 dark:text-slate-300">Find the best places to visit</p>
            </div>

            <SearchSection />

            <TourCardGroup title=" " data={tours} row={3} />

            <PaginationComponent />
        </main>
    )
}
