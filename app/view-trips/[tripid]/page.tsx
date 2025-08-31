"use client";
import Itinerary from "@/app/create-new-trip/_components/Itinerary";
import { useTripDetail } from "@/app/provider";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

function page() {
  const { tripid } = useParams();
  const { user } = useUser();
  const convex = useConvex();

  const { setTripInfo } = useTripDetail();
  useEffect(() => {
    user && GetTrip();
  }, [user]);

  const GetTrip = async () => {
    const result = await convex.query(api.tripDetails.GetTripById, {
      uid: user?.id + "",
      tripid: tripid + "" || "",
    });
    setTripInfo(result?.tripDetail || null);
  };
  return (
    <div>
      <Itinerary />
    </div>
  );
}

export default page;
