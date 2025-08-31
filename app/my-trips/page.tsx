"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserDetail } from "../provider";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

import MyTripCard from "./_components/MyTripCard";

export type trip ={
  tripId:any,
  tripDetail:any,
  _id:string
}
function Page() {
  const [trips, setTrips] = useState<trip[]>();
  const { userDetail, setUserDetail } = useUserDetail();
  const { user } = useUser();
  const convex = useConvex();

  useEffect(() => {
    if (user) gatherTrips();
  }, [user]);

  const gatherTrips = async () => {
    try {
      // call the generated API function (camelCase)
      const result = await convex.query(api.tripDetails.GetUserTrips, { uid: user?.id || "" });
      console.log("result:", result);
      setTrips(result);
      console.log("trips:", trips);
    } catch (err) {
      console.error("failed to gather trips", err);
    }
  };

  return (
    <div className="px-10 p-10 md:px-24 lg:px-48 flex flex-col justify-center items-center">
      <h2 className="font-bold text-3xl">My Trips</h2>
      {trips?.length === 0 && (
        <div>
          <h2 className="my-10 text-xl">You have not created any trips .</h2>
          <Link
            href="/create-new-trip"
            className="text-primary border-2 p-1 rounded-3xl text-center hover:bg-primary hover:text-white transition-all "
          >
            Create a new trip
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {trips?.map((trip,index) => (
          <MyTripCard key={index} trip={trip}/>
        ))}
      </div>
    </div>
  );
}

export default Page;
