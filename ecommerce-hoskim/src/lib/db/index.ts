import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = globalThis as unknown as {
  mongoose?: MongooseCache;
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async (
  MONGODB_URI = process.env.MongoDB_URI
) => {
  const cached = globalWithMongoose.mongoose!;

  if (!MONGODB_URI) {
    throw new Error("MONGO_URI is missing");
  }

  if (cached.conn) return cached.conn;

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI);
  cached.conn = await cached.promise;

  return cached.conn;
};