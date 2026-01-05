
import { fetchHome } from "@/actions/explorer";
import HomePage from "@/app/(public)/_home/HomePage";

export default async function Home() {
  const response = await fetchHome();
  return (
    <>
      <HomePage trips={response?.trips} reviews={response?.reviews} />
    </>
  );
}
