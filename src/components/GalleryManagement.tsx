import React, { useState, useEffect } from "react";
import {
  getAllGalleryItems,
  createGalleryItem,
  deleteGalleryItem,
} from "../api/gallery";
import ImageUpload from "./ImageUpload";

interface GalleryItem {
  _id: string;
  imageUrl: string;
  description: string;
}

const GalleryManagement: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [newDescription, setNewDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getAllGalleryItems(currentPage, itemsPerPage);

        // Handle empty page after deletions
        if (result.galleryItems.length === 0 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
          return;
        }

        setGalleryItems(result.galleryItems);
        setTotalItems(result.totalItems);
        setTotalPages(Math.ceil(result.totalItems / itemsPerPage));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleAddGalleryItem = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!imageUrl) {
        throw new Error("Please upload an image.");
      }

      setLoading(true);
      await createGalleryItem({
        imageUrl,
        description: newDescription,
      });

      // Reset form and show first page
      setNewDescription("");
      setImageUrl(null);
      setCurrentPage(1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      setLoading(true);
      await deleteGalleryItem(id);

      // Optimistic UI update
      setGalleryItems((prev) => prev.filter((item) => item._id !== id));
      setTotalItems((prev) => prev - 1);

      // Recalculate total pages
      setTotalPages((prev) => Math.ceil((totalItems - 1) / itemsPerPage));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate pagination range with max 5 visible pages
  const getPaginationRange = () => {
    const maxVisiblePages = 5;
    const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="container mx-auto p-4 relative">
      <h2 className="text-2xl font-bold mb-4">Gallery Management</h2>

      {/* Add Image Form */}
      <form onSubmit={handleAddGalleryItem} className="mb-4">
        {/* ... existing form elements ... */}
      </form>

      {/* Error Display */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryItems.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 shadow-md">
            <img
              src={item.imageUrl}
              alt={item.description}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <p className="mt-2 text-gray-700">{item.description}</p>
            <button
              onClick={() => handleDeleteImage(item._id)}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 rounded border disabled:opacity-50"
              disabled={currentPage === 1 || loading}
            >
              Previous
            </button>

            {getPaginationRange().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page ? "bg-blue-500 text-white" : ""
                }`}
                disabled={loading}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 rounded border disabled:opacity-50"
              disabled={currentPage === totalPages || loading}
            >
              Next
            </button>
          </nav>
        </div>
      )}

      <style>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-radius: 50%;
          border-top: 4px solid #3498db;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GalleryManagement;
