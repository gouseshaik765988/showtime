import { NextResponse } from "next/server";
import Movieslist from "@/models/Movieslist";
import connectMongo from "@/lib/connectMongo";

export async function GET() {
    await connectMongo();
    const movies = await Movieslist.find();
    return NextResponse.json(movies);
}
