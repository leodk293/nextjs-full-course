"use client";
import React, { useState, useEffect } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";

export default function EditAnimePage({params}) {
    const router = useRouter();
    const resolvedParams = use(params);
    const id = resolvedParams.anime_id;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [anime, setAnime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.target);
            const updatedAnime = {
                title: formData.get('title'),
                description: formData.get('description'),
                link: formData.get('link')
            };

            const response = await fetch(`/api/anime/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAnime),
            });

            if (!response.ok) {
                throw new Error('Failed to update anime');
            }

            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Error updating anime:', error);
            alert('Failed to update anime. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    async function getAnimeById(){
        try{
            const response = await fetch(`/api/anime/${id}`);
            const data = await response.json();
            setAnime(data);
        }
        catch(error){
            console.error("Error fetching anime:", error);
        }
    }

    useEffect(() => {
        getAnimeById();
    }, [id]);
    

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Edit Anime</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Anime Title
                    </label>
                    <input
                        defaultValue={anime.title}
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter anime title"
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        defaultValue={anime.description}
                        id="description"
                        name="description"
                        required
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter anime description"
                    />
                </div>

                <div>
                    <label
                        htmlFor="link"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Watch Link
                    </label>
                    <input
                        defaultValue={anime.link}
                        type="url"
                        id="link"
                        name="link"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter watch link"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                        isSubmitting 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {isSubmitting ? 'Updating...' : 'Update Anime'}
                </button>
            </form>
        </div>
    );
}