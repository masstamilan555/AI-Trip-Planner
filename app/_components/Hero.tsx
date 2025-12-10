"use client";

import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { ArrowDown, Globe2, Landmark, Plane, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const suggestion = [
  {
    title: "Create New Trip",
    icon: <Globe2 className="text-blue-400 h-5 w-5" />,
  },
  {
    title: "Explore Destinations",
    icon: <Plane className="text-green-400 h-5 w-5" />,
  },
  {
    title: "Plan Itinerary",
    icon: <Landmark className="text-red-400 h-5 w-5" />,
  },

  {
    title: "Find Hidden Gems",
    icon: <Globe2 className="text-purple-400 h-5 w-5" />,
  },
];
function Hero() {
  const {user} =useUser()
  const router = useRouter();
  const onSend = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    router.push("/create-new-trip")
  }

  return (
    <div className="mt-24 mx-20 md:mx-0 w-full flex justify-center">
      {/* content */}
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-xl md:text-5xl font-bold">
          Hey, I am your AI <span className="text-primary">Tour</span> Guide
        </h1>
        <p className="text-lg mx-10">
          Tell me where you want to go and plan your trip with me. I can suggest
          destinations, create custom itineraries, recommend attractions, and
          help you discover hidden gems. Let’s make your next adventure
          unforgettable!
        </p>

        {/* ip box */}
        <div>
          <div className="border rounded-2xl p-4 shadow relative">
            <Textarea
              placeholder="Create a trip from Tamilnadu to Kerala"
              className="w-full h-28 bg-transparent border-none focus-visible:ring-0 resize-none text-lg"
            />
            <Button size={"icon"} className="absolute bottom-4 right-4" onClick={() => {onSend()}}>
              <SendIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {/* Suggestions */}
        <div className="flex gap-5">
          {suggestion.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white transition-all"
            >
              {item.icon}
              <h2 className="text-xm">{item.title}</h2>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center gap-4 mt-8">
          <h2 className="my-7 mt-14 flex gap-2 text-center">
            Don't Know where to start? <strong>See what it can do</strong>
            <ArrowDown />
          </h2>
          {/* video */}
          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="from-center"
            videoSrc="https://www.example.com/dummy-video"
            thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
            thumbnailAlt="Dummy Video Thumbnail"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
