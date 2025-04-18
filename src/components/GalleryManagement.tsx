
import React, { useState, useEffect } from 'react';
import { getGalleryItems, addGalleryItem, deleteGalleryItem } from '../services/api';

interface GalleryItem {
  id: string;
  imageUrl: string;
  description: string;
}

const GalleryManagement: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newDescription, setNewDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const items = await getGalleryItems();
      setGalleryItems(items);
    } catch (err) {
      setError('Failed to fetch gallery items.');
      // In a real app, you might want to log this error to a service
      // for debugging purposes.  For now, we'll just console.log it.
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setNewImage(event.target.files[0]);
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(event.target.value);
  };

  const handleAddGalleryItem = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!newImage) {
      setError('Please select an image.');
      setIsLoading(false);
      return;
    }

    try {
      await addGalleryItem(newImage, newDescription);
      fetchGalleryItems();
      setNewImage(null);
      setNewDescription('');
    } catch (err) {
      setError('Failed to add gallery item.');
      // In a real app, you might want to log this error to a service
      // for debugging purposes.  For now, we'll just console.log it.
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteGalleryItem(id);
      fetchGalleryItems();
    } catch (err) {
      setError('Failed to delete gallery item.');
      // In a real app, you might want to log this error to a service
      // for debugging purposes.  For now, we'll just console.log it.
      console.error(err);
    } finally {
      // Always set isLoading to false, even if there's an error
      setIsLoading(false);
    }
  };

  return (    
    <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Gallery Management</h2>
        <form onSubmit={handleAddGalleryItem} className="mb-4">
          <div className="mb-2">
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
              Image:
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description:
            </label>
            <input
              type="text"
              id="description"
              value={newDescription}
              onChange={handleDescriptionChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            Add Image
          </button>
        </form>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 shadow-md">
                <img
                  src={item.imageUrl}
                  alt={item.description}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <p className="mt-2 text-gray-700">{item.description}</p>
                <button
                  onClick={() => handleDeleteImage(item.id)}
                  className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default GalleryManagement;