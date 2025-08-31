import { Button } from '@/components/ui/button'
import { Clock, ExternalLink, Ticket } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function PlaceCardItem({activity}:any) {
    return (
        <div>
            <Image src="/logo.png" alt={activity.place_name} className='object-cover rounded-xl' width={400} height={200} />
            <h2 className='font-semibold text-lg'>{activity?.place_name}</h2>
            <p className='text-gray-500 line-clamp-2'>{activity?.place_details}</p>
            <h2 className='flex gap-2 text-purple-500'><Ticket />{activity.ticket_pricing}</h2>
            <p><Clock />{activity?.best_time_to_visit}</p>
            <Link target='_blank' href={`https://www.google.com/maps/search/?api=1&query=%27` + activity?.place_name}>
                <Button variant={'outline'} size={'sm'} className='w-full mt-2'>View <ExternalLink /></Button>
            </Link>
        </div>
    )
}

export default PlaceCardItem