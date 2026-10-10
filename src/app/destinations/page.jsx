import DestinationCard from "@/components/card/DestinationCard";
import { Suspense } from "react";

const DestinationList = async () => {
  const res = await fetch("http://localhost:5000/destination", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch destinations");
  }

  const destinations = await res.json();

  return (
    <div className="grid w-full grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      {destinations.map((destination) => (
        <div key={destination._id} className="h-full min-w-0">
          <DestinationCard destination={destination} />
        </div>
      ))}
    </div>
  );
};

const DestinationSkeleton = () => (
  <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="flex h-full min-w-0 animate-pulse flex-col overflow-hidden rounded-2xl"
      >
        <div className="h-52 w-full shrink-0 bg-gray-200" />

        <div className="flex flex-1 flex-col space-y-4 p-5">
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="h-6 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
          <div className="mt-auto h-10 w-full rounded bg-gray-200" />
        </div>
      </div>
    ))}
  </div>
);

const DestinationPage = () => {
  return (
    <main className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">
          All Destinations
        </h2>

        <Suspense fallback={<DestinationSkeleton />}>
          <DestinationList />
        </Suspense>
      </div>
    </main>
  );
};

export default DestinationPage;