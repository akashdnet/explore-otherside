
import Pagination from "./Pagination";
import TripFilters from "./TripFilters";
import TripTable from "./TripTable";

// Mock data moved to server component
const guides = [
    {
        id: 1,
        photo: "/guide1.jpg",
        title: "Trip to Sundarbans",
        email: "rahim@example.com",
        guideName: "Rahim",
        status: "active",
    },
    {
        id: 2,
        photo: "/guide2.jpg",
        title: "Cox's Bazar Adventure",
        email: "karim@example.com",
        guideName: "Karim",
        status: "active",
    },
    {
        id: 3,
        photo: "/guide3.jpg",
        title: "Sajek Valley Tour",
        email: "sumi@example.com",
        guideName: "Sumi",
        status: "active",
    },
    {
        id: 4,
        photo: "/guide4.jpg",
        title: "St. Martin's Island",
        email: "jamal@example.com",
        guideName: "Jamal",
        status: "active",
    },
    {
        id: 5,
        photo: "/guide1.jpg",
        title: "Sylhet Tea Gardens",
        email: "rahim@example.com",
        guideName: "Rahim",
        status: "block",
    },
    {
        id: 6,
        photo: "/guide2.jpg",
        title: "Bandarban Trekking",
        email: "karim@example.com",
        guideName: "Karim",
        status: "active",
    },
];

export default async function GuideManagementPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    // Await searchParams before accessing properties
    const params = await searchParams;

    // Extract search params
    const search = typeof params.search === 'string' ? params.search : '';
    const status = typeof params.status === 'string' ? params.status : 'all';
    const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
    const limit = typeof params.limit === 'string' ? parseInt(params.limit) : 5;

    // Filter logic
    const filteredGuides = guides.filter((g) => {
        const matchSearch =
            g.title.toLowerCase().includes(search.toLowerCase()) ||
            g.guideName.toLowerCase().includes(search.toLowerCase());
        const matchStatus = status === "all" || g.status === status;
        return matchSearch && matchStatus;
    });

    // Pagination logic
    const totalItems = filteredGuides.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedGuides = filteredGuides.slice(startIndex, endIndex);

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-4xl font-bold text-center">User Management</h2>

            {/* Search + Sort Filters */}
            <TripFilters />

            {/* Table */}
            <TripTable guides={paginatedGuides} />

            {/* Pagination */}
            <Pagination
                totalItems={totalItems}
                itemsPerPage={limit}
                currentPage={page}
            />
        </div>
    );
}
