import { fetchHome } from "@/actions/trip";
import HomePage from "@/components/home/HomePage";

export default async function Home() {
  const response = await fetchHome();
  return (
    <>
      <HomePage trips={response?.trips} reviews={response?.reviews} />
    </>
  );
}
