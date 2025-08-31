"use client";
import { Button } from "@/components/ui/button";
import { Star, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

function HotelCardItem({ hotel }: any) {
  // useEffect(()=>{
  //   hotel&&GetGooglePlaceDetail()

  // },[hotel])

  // const GetGooglePlaceDetail =async()=>{
  //   const res = await axios.post('/api/google-place-detail',{
  //     placeName:hotel?.hotel_name
  //   }
  //   )
  //   console.log(res?.data)
  // }
  return (
    <div>
      <Image src="/logo.png" alt={hotel.hotel_name} width={400} height={200} />
      <h2 className="font-semibold text-lg">{hotel?.hotel_name}</h2>
      <h2 className="text-gray-500">{hotel?.hotel_address}</h2>
      <div className="flex gap-4">
        <p className="flex gap-2 text-red-600">
          <Wallet />
          {hotel?.price_per_night}
        </p>
        <p className="text-yellow-600 flex gap-2">
          <Star />
          {hotel?.rating}
        </p>
      </div>
      {/* <p className='line-clamp-2 text-gray-500'>{hotel?.description}</p> */}
      <Link
        href={
          `https://www.google.com/maps/search/?api=1&query=%27` +
          hotel?.hotel_name
        }
        target="_blank"
      >
        <Button variant={"outline"} className="w-full mt-2">
          View
        </Button>
      </Link>
    </div>
  );
}

export default HotelCardItem;
