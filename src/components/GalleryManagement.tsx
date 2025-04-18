
import React, { useState, useEffect } from 'react';
import { getGalleryItems, addGalleryItem, deleteGalleryItem } from '../api/gallery';

interface GalleryItem {
  id: string;
  imageUrl: string;
  description: string;
}

const GalleryManagement: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newDescription, setNewDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10); // You can adjust the limit as needed
  const [totalItems, setTotalItems] = useState<number>(0);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchGalleryItems();
  }, [page, limit]);

  const fetchGalleryItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const { items, totalItems: total } = await getGalleryItems(page, limit);
      setGalleryItems(items);
      setTotalItems(total);
    } catch (err) {
      setError('Failed to fetch gallery items.');
      // In a real app, you might want to log this error to a service
      // for debugging purposes.  For now, we'll just console.log it.
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setPreviewImageUrl(null);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setNewImage(file);
        setPreviewImageUrl(URL.createObjectURL(file));
      } else {
        setError('Please select a valid image file.');
        setNewImage(null);
        setPreviewImageUrl(null);
        e.target.value = ''; // Reset the input
      }
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(event.target.value);
  };

  const handleAddGalleryItem = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!newImage) {
      setError('Please select an image.');
      setLoading(false);
      return
    }

    try {
      const formData = new FormData();
      formData.append('image', newImage);
      formData.append('description', newDescription);

      await addGalleryItem(formData);
      fetchGalleryItems();
      setNewImage(null);
      setNewDescription('');
      setPreviewImageUrl(null);
    } catch (err) {
      setError('Failed to add gallery item.');
      // In a real app, you might want to log this error to a service
      // for debugging purposes.  For now, we'll just console.log it.
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    setLoading(true)
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
      setLoading(false);
    }
  };

  return (    
    <div className="container mx-auto p-4 relative">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-50 z-10">
          <div className="loader"></div>
        </div>
      )}
      <style>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-radius: 50%;
          border-top: 4px solid #3498db;
          width: 40px;
          height: 40px;
          -webkit-animation: spin 2s linear infinite; /* Safari */
          animation: spin 2s linear infinite;
        }

        /* Safari */
        @-webkit-keyframes spin {
          0% { -webkit-transform: rotate(0deg); }
          100% { -webkit-transform: rotate(360deg); }
        }

        <h2 className="text-2xl font-bold mb-4">Gallery Management</h2>
        <form onSubmit={handleAddGalleryItem} className="mb-4" encType="multipart/form-data">
          <div className="mb-2">
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
              Image:
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {previewImageUrl && (
              <div className="mt-2">
                <img
                  src={previewImageUrl}
                  alt="Image preview" className="h-32 w-32 object-cover rounded" />
              </div>
            )}
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
            className="bg-[#192241] hover:bg-[#374676] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 mt-2"
          >
            Add Image
          </button>
        </form>

        {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
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
                  className="mt-2 bg-[#D82148] hover:bg-[#F15353] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(totalItems / limit) }, (_, i) => i + 1).map(
              (num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`mx-1 px-3 py-1 rounded ${
                    page === num
                      ? 'bg-[#192241] text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {num}
                </button>
              )
            )}
          </div>
      </div>
    );
  };

  export default GalleryManagement;