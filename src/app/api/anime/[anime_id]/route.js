import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db/connectMongoDB";
import Anime from "@/lib/models/anime";
import { deleteAnime } from "@/lib/data";

export async function PUT(request, { params }) {
  try {
    const { anime_id } = params;
    const { title, description, link } = await request.json();

    if (!title || !description || !link) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const updatedAnime = await Anime.findByIdAndUpdate(
      anime_id,
      { title, description, link },
      { new: true }
    );

    if (!updatedAnime) {
      return NextResponse.json(
        { error: "Anime not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedAnime, { status: 200 });
  } catch (error) {
    console.error("Error updating anime:", error);
    return NextResponse.json(
      { error: "Failed to update anime" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { anime_id } = params;
    await connectMongoDB();
    const anime = await Anime.findById(anime_id);
    if (!anime) {
      return NextResponse.json({ error: "Anime not found" }, { status: 404 });
    }
    return NextResponse.json(anime, { status: 200 });

  }
    catch(error){
        console.error("Error fetching anime:", error);
        return NextResponse.json(
            { error: "Failed to fetch anime" },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
      const { anime_id } = params;
      await deleteAnime(anime_id);
      return NextResponse.json({ message: 'Anime deleted successfully' });
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to delete anime' },
        { status: 500 }
      );
    }
  } 