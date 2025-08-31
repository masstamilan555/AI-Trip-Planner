import React from "react";
import ChatBox from "./_components/ChatBox";
import Itinerary from "./_components/Itinerary";

function CreateNewTrip() {
  return (
    // left column fixed 360px, right column fills remaining space
    <div className="grid grid-cols-1 md:grid-cols-[600px_1fr] gap-5 p-6 min-h-[80vh]">
      {/* LEFT: Chat / controls */}
      <div className="flex flex-col h-full">
        {/* Make ChatBox fill the left column height and allow internal scrolling */}
        <div className="h-full">
          <ChatBox />
        </div>
      </div>

      {/* RIGHT: Itinerary (fluid) */}
      <div className="flex flex-col h-full">
        <Itinerary />
      </div>
    </div>
  );
}

export default CreateNewTrip;
