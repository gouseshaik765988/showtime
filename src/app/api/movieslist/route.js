import { NextResponse } from "next/server";
import Movieslist from "@/models/Movieslist";
import connectMongo from "@/lib/connectMongo";

export async function GET() {
    try {
        // 1️⃣ Ensure env exists
        if (!process.env.MONGODB_URI) {
            return NextResponse.json(
                { error: "MONGODB_URI is missing" },
                { status: 500 }
            );
        }

        // 2️⃣ Connect to DB
        await connectMongo();

        // 3️⃣ Fetch data
        const movies = await Movieslist.find();

        // 4️⃣ Success response
        return NextResponse.json(movies, { status: 200 });

    } catch (error) {
        console.error("❌ Error fetching movies:", error);

        return NextResponse.json(
            { error: "Failed to fetch movies" },
            { status: 500 }
        );
    }
}

