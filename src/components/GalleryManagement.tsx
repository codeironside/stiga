tsx
import React, { useState, useEffect } from 'react';
import { getGalleryItems, addGalleryItem, deleteGalleryItem } from '../services/api';

interface GalleryItem {
  _id: string;
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
    <div>
      <h2>Gallery Management</h2>
      <form onSubmit={handleAddGalleryItem}>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" value={newDescription} onChange={handleDescriptionChange} />
        </div>
        <button type="submit" disabled={isLoading}>
          Add Image
        </button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {galleryItems.map((item) => (
            <li key={item._id}>
              <img src={item.imageUrl} alt={item.description} style={{ width: '100px', height: '100px' }} />
              <p>{item.description}</p>
              <button onClick={() => handleDeleteImage(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GalleryManagement;