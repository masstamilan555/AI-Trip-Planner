import React from 'react'
import { trip } from '../page'
import Image from 'next/image'
import { ArrowBigRight } from 'lucide-react'
import Link from 'next/link'
type Props ={
    trip:trip
}
function MyTripCard({trip}:Props) {
  return (
          <Link href={'/view-trips/'+trip?._id} className="shadow p-5 my-5 rounded-lg">
            <Image src={'/travel.png'} alt="travel" width={400} height={200} className="rounded-lg object-cover"/>
            <h2 className="flex items-center gap-2 font-semibold text-xl">{trip?.tripDetail.origin} <ArrowBigRight/>{trip?.tripDetail.destination}</h2>
            <h2>{trip?.tripDetail?.duration} with a {trip?.tripDetail?.budget} budget</h2>
          </Link>
)
}

export default MyTripCard