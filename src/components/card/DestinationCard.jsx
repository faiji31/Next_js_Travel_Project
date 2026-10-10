import { ArrowUpRight, CalendarDays, MapPin, Star } from 'lucide-react'
import Link from 'next/link'


const DestinationCard = ({ destination }) => {
  const { _id, destinationName, country, price, duration, imageUrl } = destination
  const days = Number(duration)
  const nights = Math.max(days - 1, 0)

  return (
    <div className="w-full ">
      {/* Image + rating badge */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={destinationName}
          className="h-full w-full object-cover"
        />
        <div className="absolute right-3 top-3 flex items-center gap-1 bg-white/90 px-2 py-1 text-sm font-medium">
          4.5 <Star size={14} className="fill-black" />
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 pt-3">
        <p className="flex items-center gap-1.5 text-sm text-gray-600">
          <MapPin size={14} /> {country}
        </p>

        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{destinationName}</h3>
          <p className="font-semibold">
            ${price}
            <span className="text-xs font-normal text-gray-500">/Person</span>
          </p>
        </div>

        <p className="flex items-center gap-1.5 text-sm text-gray-600">
          <CalendarDays size={14} /> {days} Days/{nights} Nights
        </p>

        <Link
          href={`/destinations/${_id}`}
          className="inline-flex items-center gap-1 text-sm font-medium uppercase text-cyan-600 hover:underline"
        >
          Book now <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  )
}

export default DestinationCard