"use client";
import React, { useEffect } from 'react';
import { Timeline } from '@/components/ui/timeline';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import Image from 'next/image';

// Keep the original tripData as a fallback when tripInfo is not yet available from context
// const fallbackTripData = {
//   destination: 'Chennai',
//   duration: '3 Days',
//   origin: 'Goa',
//   budget: 'Moderate',
//   group_size: 'Family: 3 to 5 People',
//   hotels: [
//     {
//       hotel_name: "The Raintree Hotel, St. Mary's Road",
//       hotel_address: "120, St Mary's Rd, Alwarpet, Chennai, Tamil Nadu 600018",
//       price_per_night: 'INR 5000 - 7000',
//       hotel_image_url: 'https://example.com/raintree_st_marys.jpg',
//       geo_coordinates: { latitude: 13.045, longitude: 80.252 },
//       rating: 4.3,
//       description:
//         "A contemporary hotel known for its eco-friendly practices and rooftop pool. Offers comfortable rooms and good dining options, suitable for families. Centrally located with easy access to attractions.",
//     },
//     {
//       hotel_name: 'Novotel Chennai OMR',
//       hotel_address:
//         'OMR, Old Mahabalipuram Road, Sholinganallur, Chennai, Tamil Nadu 600119',
//       price_per_night: 'INR 4500 - 6500',
//       hotel_image_url: 'https://example.com/novotel_omr.jpg',
//       geo_coordinates: { latitude: 12.8943, longitude: 80.2227 },
//       rating: 4.2,
//       description:
//         'Located on the IT corridor, this hotel offers modern amenities, spacious rooms, and a relaxed ambiance. Features a swimming pool and multiple dining venues, great for families seeking comfort and good service.',
//     },
//     {
//       hotel_name: 'Ambassador Pallava Chennai',
//       hotel_address:
//         'GST Road, Near Gemini Flyover, Nungambakkam, Chennai, Tamil Nadu 600006',
//       price_per_night: 'INR 4000 - 6000',
//       hotel_image_url: 'https://example.com/ambassador_pallava.jpg',
//       geo_coordinates: { latitude: 13.0617, longitude: 80.2556 },
//       rating: 4,
//       description:
//         'A well-established hotel with a classic charm, offering comfortable accommodation and a range of facilities. Its central location makes it convenient for exploring Chennai\'s main attractions and food spots.',
//     },
//   ],
//   itinerary: [
//     /* trimmed for brevity in fallback - actual structure used at runtime should come from tripInfo */
//   ],
// };

function Itinerary() {
  // get tripInfo from provider/context
  const { tripInfo,setTripInfo } = useTripDetail();

  useEffect(()=>{
    tripInfo&&setTripInfo
  },[tripInfo])
  // prefer tripInfo from context; fall back to the hardcoded data
  const tripSource = tripInfo || null;

  // If there's absolutely no hotels or itinerary, show a friendly empty state
  const hasContent = (tripSource?.hotels?.length > 0) || (tripSource?.itinerary?.length > 0);

    const data = [
    {
      title: 'Recommended Hotels',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {tripSource?.hotels?.map((hotel: any, index: number) => (
            <HotelCardItem key={index} hotel={hotel} />
          ))}
        </div>
      ),
    },
    ...(tripSource?.itinerary || []).map((dayData: any) => ({
      title: `Day ${dayData.day}`,
      content: (
        <div>
          <p>Best Time : {dayData?.best_time_to_visit_day}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dayData.activities?.map((activity: any, index: number) => (
              <PlaceCardItem key={index} activity={activity} />
            ))}
          </div>
        </div>
      ),
    })),
  ];

  if (!hasContent) {
    return (
      <div>
        {tripSource?<Timeline data={data} tripData={tripSource} />:<Image src="/travel.png" alt="No Itinerary" width={800} height={800} className="w-full h-full object-cover rounded-3xl"/>}
      </div>
    );
  }



  return (
    <div className="relative w-full h-[80vh] overflow-auto">
      <Timeline tripData={tripSource} data={data} />
    </div>
  );
}

export default Itinerary;
