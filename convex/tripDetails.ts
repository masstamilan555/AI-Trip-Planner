import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateTripDetail = mutation({
  args: {
    tripId: v.string(),
    tripDetail: v.any(),
    uid: v.string(), // required
  },
  handler: async (ctx, args) => {
    // Server-side will *not* get called if uid validation fails.
    const result = await ctx.db.insert("TripDetailTable", {
      tripDetail: args.tripDetail,
      tripId: args.tripId,
      uid: args.uid,
    });
    return { id: result };
  },
});

export const GetUserTrips = query({
  args: {
    uid: v.string(), // required
  },
  handler: async (ctx, args): Promise<any[]> => {
    const trips = await ctx.db
      .query("TripDetailTable")
      .filter((q) => q.eq(q.field("uid"), args.uid))
      .order("desc")
      .collect();
    return trips;
  },
});
export const GetTripById = query({
  args: {
    uid: v.string(),
    tripid:v.string() // required
  },
  handler: async (ctx, args): Promise<any> => {
    console.log(args)
    const trip = await ctx.db
      .query("TripDetailTable")
      .filter((q) => q.eq(q.field("_id"), args.tripid))
      .first();
    return trip;
  },
});
