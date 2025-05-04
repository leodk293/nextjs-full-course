import { createAnime, deleteAnime } from "@/lib/data";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, link } = body;

    if (!title || !description || !link) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newAnime = await createAnime({ title, description, link });
    return NextResponse.json(newAnime, { status: 201 });
  } catch (error) {
    console.error("Error creating anime:", error);
    return NextResponse.json(
      { error: "Failed to create anime" },
      { status: 500 }
    );
  }
} 

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await deleteAnime(id);
    return NextResponse.json({ message: 'Anime deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete anime' },
      { status: 500 }
    );
  }
} 