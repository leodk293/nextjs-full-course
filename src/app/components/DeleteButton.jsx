'use client';

import { useRouter } from 'next/navigation';

export default function DeleteButton({ animeId }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this anime?')) {
      try {
        const response = await fetch(`/api/anime/${animeId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          router.refresh();
        } else {
          throw new Error('Failed to delete anime');
        }
      } catch (error) {
        console.error('Error deleting anime:', error);
        alert('Failed to delete anime. Please try again.');
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="border border-transparent bg-red-400 text-white px-2 py-1 rounded-md hover:bg-red-500 transition-colors"
    >
      Delete
    </button>
  );
} 