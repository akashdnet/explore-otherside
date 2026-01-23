import { getMyTrips } from "@/actions/trip";
import TripManagementClient from "./TripManagementClient";

export default async function GuideManagementPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    // Await searchParams before accessing properties
    const paramsPromise = await searchParams;

    // Normalize params
    const page = typeof paramsPromise.page === 'string' ? parseInt(paramsPromise.page) : 1;
    const limit = typeof paramsPromise.limit === 'string' ? parseInt(paramsPromise.limit) : 10;
    const search = typeof paramsPromise.term === 'string' ? paramsPromise.term : '';
    const status = typeof paramsPromise.status === 'string' && paramsPromise.status !== 'all' ? paramsPromise.status : undefined;

    // Fetch data from server action
    const data = await getMyTrips({
        page,
        limit,
        search,
        status,
    });

    return (
        <TripManagementClient
            data={data}
            searchParams={paramsPromise}
        />
    );
}
