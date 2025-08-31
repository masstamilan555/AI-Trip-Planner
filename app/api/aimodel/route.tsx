import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { aj } from '@/lib/arcjet';
const  openai= new OpenAI({
    apiKey: process.env.GOOGLE_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.
Only ask questions in this order: 
1. Starting location (source) 
2. Destination city or country 
3. Group size (Solo, Couple, Family, Friends) 
4. Budget (Low, Medium, High) 
5. Trip duration (number of days) 
6. Travel interests (adventure, sightseeing, cultural, food, nightlife, relaxation) 
7. Special requirements or preferences (if any)

When you reply, respond ONLY with a JSON object and absolutely no extra text. Use this exact JSON schema:
{
  "resp": "Text response to show the user",
  "ui": "destination|groupSize|budget|TripDuration|Final"
}
If you cannot follow the schema, respond with a JSON object that contains an 'error' field explaining the problem.
`;


const FINAL_PROMPT =` Generate Travel Plan with give details, give me Hotels options list with HotelName, 
Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates,Place address, ticket Pricing, Time travel each of the location , with each day plan with best time to visit in JSON format.
 Output Schema:
 {
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}`


export async function POST(req: NextRequest) {
  const user = await currentUser();
  const { messages ,isFinal } = await req.json();
  const userId =
    user?.primaryEmailAddress && user.primaryEmailAddress.emailAddress
      ? user.primaryEmailAddress.emailAddress
      : undefined;
  const decision = await aj.protect(req, { userId: userId ?? '', requested:isFinal? 5:0 }); // Deduct 5 tokens from the bucket
  

  const {has} = await auth()
  const hasPremium =has({plan:'monthly'})
  if (decision.isDenied() && !hasPremium) {
    return NextResponse.json({
      resp: "You have exceeded your usage limits. Please try again later.",
      ui:'limit'
    })}
  try {
    const completion = await openai.chat.completions.create({
      model: 'gemini-2.5-flash',
      // you can try json_schema option (example below) for stricter validation
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: isFinal ? FINAL_PROMPT : PROMPT },
        ...messages,
      ],
    });

    // completion.choices[0].message may be a string or object depending on the provider
    const message = completion.choices?.[0]?.message;
    const raw = message?.content ?? message ?? '';

    // If it's already an object, return it straight away
    if (typeof raw === 'object') {
      return NextResponse.json(raw);
    }

    // If it's a string, try to parse robustly:
    if (typeof raw === 'string') {
      // 1) Try direct parse first (fast path)
      try {
        const parsed = JSON.parse(raw);
        return NextResponse.json(parsed);
      } catch (e) {
        // 2) If direct parse fails, extract the first {...} block (tolerant)
        const firstBrace = raw.indexOf('{');
        const lastBrace = raw.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          const candidate = raw.slice(firstBrace, lastBrace + 1);
          try {
            const parsed = JSON.parse(candidate);
            return NextResponse.json(parsed);
          } catch (e2) {
            // fall through to returning an error with raw text for debugging
            console.error('Failed to JSON.parse candidate substring:', candidate, e2);
            return NextResponse.json(
              { error: 'Model returned malformed JSON; failed to parse', raw },
              { status: 500 }
            );
          }
        } else {
          console.error('No JSON object found in model response:', raw);
          return NextResponse.json(
            { error: 'No JSON object found in model response', raw },
            { status: 500 }
          );
        }
      }
    }

    // Fallback
    return NextResponse.json({ error: 'Unexpected model response format', raw }, { status: 500 });
  } catch (error) {
    console.error('Error generating response:', error);
    return NextResponse.json({ error: 'Failed to generate response', detail: String(error) }, { status: 500 });
  }
}
