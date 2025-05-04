import Image from "next/image";
import { getAnimes } from "@/lib/data";
import { populateAnimeDatabase } from "@/lib/data";
import Link from "next/link";
import DeleteButton from "./components/DeleteButton";

export default async function Home() {
  await populateAnimeDatabase();
  const animes = await getAnimes();
  //console.log(animes);
  return (
    <div className="flex flex-col items-center mt-10 max-w-10xl mx-auto">
      <h1 className=" text-2xl text-center italic font-bold md:text-4xl">
        Share your favorite anime with your friends
      </h1>

      <Link
        href="/post"
        className="text-blue-500 text-lg font-bold mt-5 hover:underline"
      >
        Click here to post a new anime ➡️
      </Link>

      <div className=" mt-10 flex flex-wrap gap-5 w-full justify-center">
        {animes.map((anime) => (
          <div
            className="flex flex-col gap-3 border-2 border-gray-300 rounded-md p-4 w-[300px] h-auto justify-between"
            key={anime._id}
          >
            <h2 className="text-xl font-bold truncate">{anime.title}</h2>
            <p className="text-sm text-gray-500 overflow-y-auto flex-1">
              {anime.description}
            </p>
            <div className=" flex flex-row gap-5">
              <Link
                className="text-blue-500 font-extrabold mt-auto"
                href={anime.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch
              </Link>
              <Link
                className="text-green-500 font-extrabold mt-auto"
                href={`/edit/${anime._id}`}
                rel="noopener noreferrer"
              >
                Edit
              </Link>
              <DeleteButton animeId={anime._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
