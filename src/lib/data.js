import { connectMongoDB } from "./db/connectMongoDB";
import Anime from "./models/anime";

// Function to get all animes
export async function getAnimes() {
  try {
    await connectMongoDB();
    const animes = await Anime.find({}).sort({ createdAt: -1 });
    return animes;
  } catch (error) {
    console.error("Error fetching animes:", error);
    throw new Error("Failed to fetch animes");
  }
}

// Function to create a new anime
export async function createAnime(animeData) {
  try {
    await connectMongoDB();
    const newAnime = await Anime.create(animeData);
    return newAnime;
  } catch (error) {
    console.error("Error creating anime:", error);
    throw new Error("Failed to create anime");
  }
}

//Delete anime
export async function deleteAnime(animeId) {
  try {
    await connectMongoDB();
    await Anime.findByIdAndDelete(animeId);
    return { message: "Anime deleted successfully" };
  }
  catch(error){
    console.error("Error deleting anime:", error);
    throw new Error("Failed to delete anime");
  }
}

// Sample anime data to populate the database
const sampleAnimes = [
  {
    title: "Attack on Titan",
    description: "In a world where humanity resides within enormous walled cities to protect themselves from Titans, giant humanoid creatures who eat humans seemingly without reason.",
    link: "https://clone-anime-xi.vercel.app/anime/16498"
  },
  {
    title: "Death Note",
    description: "A high school student discovers a supernatural notebook that allows him to kill anyone whose name he writes in it.",
    link: "https://clone-anime-xi.vercel.app/anime/1535"
  },
  {
    title: "Fullmetal Alchemist: Brotherhood",
    description: "Two brothers search for a Philosopher's Stone after an alchemy experiment goes wrong and leaves them in a catastrophic new state.",
    link: "https://clone-anime-xi.vercel.app/anime/5114"
  }
];

// Function to populate the database with sample data
export async function populateAnimeDatabase() {
  try {
    await connectMongoDB();
    const existingAnimes = await Anime.find({});
    
    if (existingAnimes.length === 0) {
      await Anime.insertMany(sampleAnimes);
      console.log("Sample animes added to database");
    } else {
      console.log("Database already contains anime data");
    }
  } catch (error) {
    console.error("Error populating database:", error);
    throw new Error("Failed to populate database");
  }
}
