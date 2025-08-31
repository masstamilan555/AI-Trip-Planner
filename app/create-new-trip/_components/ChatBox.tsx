"use client"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader, SendIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EmptyState from './EmptyState'
import GroupSizeUi from './GroupSizeUi'
import BudgetUi from './BudgetUi'
import FinalUi from './FinalUi'
import  SelectDays  from './SelectDays'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useTripDetail, useUserDetail } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'


type Message ={
    role:string,
    content:string,
    ui?: string
}

export type TripInfo ={
  budget:string,
  destination:string,
  duration:string,
  group_size:string,
  origin:string
  hotels?:any[],
  itinerary?:any[]
}

function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isFinal, setIsFinal] = useState<boolean>(false);
    const [tripDetails, setTripDetails] = useState<TripInfo>();
    const  {userDetail,setUserDetail}=useUserDetail()
  const {tripInfo,setTripInfo}=useTripDetail();
const {user} = useUser();
    const SaveTripDetail = useMutation(api.tripDetails.CreateTripDetail)
    const onSend =async () => {
        if (!input.trim()) return; // Prevent sending empty messages
        setInput("");
        setLoading(true);
        const newMessage: Message = { role: 'user', content: input };
        setMessages((prev:Message[]) => [...prev, newMessage]);
        // Handle send message logic here
        const result = await axios.post('/api/aimodel', {
            messages: [...messages, { role: 'user', content: input }],isFinal: isFinal
        });

        if(isFinal ){
          setTripDetails(result?.data?.trip_plan);
          setTripInfo(result?.data?.trip_plan);
          const tripId = uuidv4();
          await SaveTripDetail({
            tripDetail:result?.data?.trip_plan,
            tripId:tripId,
            uid:user?.id || ''
          })
        }
        
        console.log("trip",result?.data);
        !isFinal && setMessages((prev:Message[]) => [...prev, { role: 'assistant', content: result?.data?.resp ,ui: result?.data?.ui}]);
        setLoading(false);
    }

    const RenderGenerativeUI =(ui:string)=>{
      switch(ui){
        case "budget":
          return <BudgetUi onSelectedOption={(v:string)=>{setInput(v);onSend()}}/>
        case "groupSize":
          return <GroupSizeUi onSelectedOption={(v:string)=>{setInput(v);onSend()}}/>
    
        case "TripDuration":
          return <SelectDays onSelectedOption={(v:string)=>{setInput(v);onSend()}} />
        case "Final":
          return FinalUi({ viewTrip: () => console.log("hii") }, !tripDetails)
        default:
          return null;
      }
    }

    useEffect(()=>{
      if(messages[messages.length -1]?.ui === "Final"){
        setIsFinal(true);
        setInput("Great,now we are ready");
        
      }
    },[messages])

    useEffect(()=>{
      if(isFinal && input){
        onSend();
      }
    },[isFinal])
  return (
    <div className='flex flex-col h-[75vh]'>
      {messages.length === 0 && <EmptyState onSelectOption={(v:string)=>{setInput(v);onSend()}}/>}
        <section className='flex-1 overflow-y-auto p-4'>
            {messages.map((msg:Message, index) => (
              msg.role === 'user' ? (
                <div className='flex justify-end mt-2' key={index}>
                <div className='max-w-lg bg-primary text-white p-2 rounded-lg'>
                    {msg.content}
                </div>
            </div> ):(
            <div className='flex justify-start mt-2' key={index}>
                <div className='max-w-lg bg-gray-100 text-black p-3 rounded-lg'>
                    {msg.content}
                    {RenderGenerativeUI(msg.ui ?? "")} 
                </div>
            </div>)
            ))}
            {loading && (
              <div className='flex justify-start mt-2' >
                <div className='max-w-lg bg-gray-100 text-black p-3 rounded-lg'>
                    <Loader className="h-5 w-5 animate-spin" />
                </div>
            </div>)}
        </section>
 <div>
          <div className="border rounded-2xl p-4 shadow relative">
            <Textarea
              placeholder="Start typing..."
              className="w-full h-28 bg-transparent border-none focus-visible:ring-0 resize-none text-lg"
              value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <Button size={"icon"} className="absolute bottom-4 right-4" onClick={() => {onSend()}}>
              <SendIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <section>
            
        </section>
    </div>
  )
}

export default ChatBox