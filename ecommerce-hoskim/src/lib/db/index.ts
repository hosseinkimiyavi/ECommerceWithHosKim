import mongoose from "mongoose";



const cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async (
    MONGODB_URI=process.env.MongoDB_URI
) => {
    if (cached.conn) return cached.conn;
    if (!MONGODB_URI) throw new Error('MONGO_URI is missing');

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI)
    cached.conn = await cached.promise;
    return cached.conn;
}