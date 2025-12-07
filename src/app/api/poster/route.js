
import cloudinary from "@/lib/cloudinary";
export async function POST(request) {
    try {
        const body = await request.json();
        const file = body.file;

        const uploadResponse = await cloudinary.uploader.upload(file, {
            folder: "nextjs-demo",
        });

        return Response.json({ url: uploadResponse.secure_url });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    return Response.json({ message: "API works!" });
}