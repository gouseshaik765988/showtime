import { NextResponse } from "next/server";
import Movieslist from "@/models/Movieslist";
import connectMongo from "@/lib/connectMongo";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
    try {
        await connectMongo();

        const body = await req.json();
        const { moviename, language, directorName, poster, video, year, starring, genres, categories, country, description } = body;

        if (!moviename || !language || !directorName || !poster || !video) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if movie exists
        const existingMovie = await Movieslist.findOne({ moviename });
        if (existingMovie) {
            return NextResponse.json({ error: "Movie already exists" }, { status: 400 });
        }

        // Upload poster to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(poster, {
            folder: language,
        });
        // Upload video to Cloudinary
        const videoUploadResponse = await cloudinary.uploader.upload(video, {
            resource_type: "video",
            folder: language,
        });

        // Save movie in MongoDB
        const newMovie = await Movieslist.create({
            moviename,
            language,
            directorName,
            poster: uploadResponse.secure_url,
            video: videoUploadResponse.secure_url,
            year,
            starring,
            genres,
            categories,
            country,
            description,
        });

        return NextResponse.json({
            success: true,
            message: `Movie ${moviename} created successfully!`,
        });

    } catch (error) {
        console.error("❌ upload API Error:", error);
        return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
    }
}
