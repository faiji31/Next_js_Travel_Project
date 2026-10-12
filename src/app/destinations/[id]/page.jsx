import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  MapPin,
  SquarePen,
  Star,
  Trash2,
} from "lucide-react";

const formatDuration = (d) => {
  const days = parseInt(d, 10);
  if (!days || days < 1) return d ?? "";
  return `${days} ${days === 1 ? "Day" : "Days"} / ${Math.max(days - 1, 0)} ${
    days - 1 === 1 ? "Night" : "Nights"
  }`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "TBA";
  const [y, m, d] = dateStr.split("-");
  return `${m}/${d}/${y}`; // 11/06/2026
};

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/destination/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold">Destination not found</h2>
        <Link href="/destinations" className="btn btn-primary mt-6">
          Back to Destinations
        </Link>
      </div>
    );
  }

  const destination = await res.json();

  const {
    destinationName,
    country,
    category,
    price,
    duration,
    departureDate,
    imageUrl,
    description,
    rating,
    reviews,
    highlights,
  } = destination;

  const hasDescription = description && description.trim().length > 3;
  const descriptionText = hasDescription
    ? description
    : `Explore ${destinationName}, ${country} — a wonderful ${
        category?.toLowerCase() || "travel"
      } destination. More details coming soon.`;

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">
      {/* Top bar */}
      <div className="flex items-center justify-between py-4">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          <ArrowLeft size={16} /> Back to Destinations
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/destinations/${id}/edit`}
            className="btn btn-sm btn-outline border-gray-300 text-gray-700 bg-white font-normal"
          >
            <SquarePen size={14} /> Edit
          </Link>
          <button className="btn btn-sm btn-outline btn-error bg-white font-normal">
            <Trash2 size={14} /> Cancel
          </button>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative w-full h-64 sm:h-80 md:h-[420px] rounded-md overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={destinationName}
          className="w-full h-full object-cover"
        />
        {category && (
          <span className="absolute top-4 left-4 badge badge-lg bg-white/90 border-none text-gray-700">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        {/* Left column */}
        <div className="lg:col-span-2">
          <p className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin size={14} /> {country}
          </p>

          <h1 className="text-4xl md:text-5xl font-serif mt-2">
            {destinationName}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
            {rating && (
              <span className="flex items-center gap-1.5">
                <Star size={16} className="text-green-600" fill="currentColor" />
                <span className="font-semibold">{rating}</span>
                {reviews && (
                  <span className="text-gray-500">({reviews} reviews)</span>
                )}
              </span>
            )}
            <span className="flex items-center gap-1.5 font-semibold">
              <Clock size={14} className="text-gray-500" />
              {formatDuration(duration)}
            </span>
          </div>

          <section className="mt-10">
            <h2 className="text-2xl font-serif mb-3">Overview</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {descriptionText}
            </p>
          </section>

          {Array.isArray(highlights) && highlights.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-serif mb-3">Highlights</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {highlights.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <Check size={16} className="text-green-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Booking card */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6 border border-gray-200 rounded-md shadow-sm p-5 bg-white">
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-3xl font-semibold text-cyan-600 mt-1">
              ${price}
            </p>
            <p className="text-xs text-gray-500">per person</p>

            <div className="mt-6 bg-gray-100 rounded px-4 py-3 text-sm text-gray-700 flex items-center gap-2">
              <Calendar size={14} className="text-gray-500" />
              {formatDate(departureDate)}
            </div>

            <button className="btn w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white border-none">
              Book Now <ArrowRight size={16} />
            </button>

            <ul className="mt-4 space-y-2 text-xs text-gray-600">
              {[
                "Free cancellation up to 7 days",
                "Travel insurance included",
                "24/7 customer support",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check size={14} className="text-green-600" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;