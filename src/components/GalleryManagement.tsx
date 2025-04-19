import React, { useState, useEffect } from "react";
import {
  getAllGalleryItems,
  createGalleryItem,
  deleteGalleryItem,
} from "../api/gallery";

interface GalleryItem {
  id: string;
  imageUrl: string;
  description: string;
}

interface GalleryResponse {
  items: GalleryItem[];
  totalItems: number;
}

const GalleryManagement: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newDescription, setNewDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchGalleryItems();
  }, [currentPage]);

  const fetchGalleryItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getAllGalleryItems(currentPage, itemsPerPage);

      // Check the structure of the API response and handle it accordingly
      if (result && typeof result === "object") {
        if (Array.isArray(result.galleryItems)) {
          // If the API returns an array directly
          setGalleryItems(result.galleryItems);
          setTotalItems(result.galleryItems.length);
          setTotalPages(1);
        } else if (result.galleryItems && Array.isArray(result.galleryItems)) {
          // If the API returns an object with items array
          setGalleryItems(result.items);
          setTotalItems(result.totalItems || result.items.length);
          setTotalPages(
            Math.ceil((result.totalItems || result.items.length) / itemsPerPage)
          );
        } else {
          console.error("Unexpected API response format:", result.galleryItems);
          setError("Unexpected data format received from server.");
          setGalleryItems([]);
        }
      } else {
        console.error("Invalid API response:", result);
        setError("Invalid response received from server.");
        setGalleryItems([]);
      }
    } catch (err: any) {
      console.error("Error fetching gallery items:", err);
      setError(err.message || "Failed to fetch gallery items.");
      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setPreviewImageUrl(null);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setNewImage(file);
        setPreviewImageUrl(URL.createObjectURL(file));
      } else {
        setError("Please select a valid image file.");
        setNewImage(null);
        setPreviewImageUrl(null);
        e.target.value = ""; // Reset the input
      }
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewDescription(event.target.value);
  };

  const handleAddGalleryItem = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!newImage) {
      setError("Please select an image.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", newImage);
      formData.append("description", newDescription);

      await createGalleryItem(formData);
      fetchGalleryItems();
      setNewImage(null);
      setNewDescription("");
      setPreviewImageUrl(null);

      // Reset file input
      const fileInput = document.getElementById("image") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err: any) {
      console.error("Error adding gallery item:", err);
      setError(err.message || "Failed to add gallery item.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteGalleryItem(id);
      fetchGalleryItems();
    } catch (err: any) {
      console.error("Error deleting gallery item:", err);
      setError(err.message || "Failed to delete gallery item.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <h2 className="text-2xl font-bold mb-4">Gallery Management</h2>
      <form
        onSubmit={handleAddGalleryItem}
        className="mb-4"
        encType="multipart/form-data"
      >
        <div className="mb-2">
          <label
            htmlFor="image"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
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
                alt="Image preview"
                className="h-32 w-32 object-cover rounded"
              />
            </div>
          )}
        </div>
        <div className="mb-2">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
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
          disabled={loading}
          className="bg-[#192241] hover:bg-[#374676] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 mt-2"
        >
          Add Image
        </button>
      </form>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Display gallery items with proper null check */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
        {galleryItems && galleryItems.length > 0 ? (
          galleryItems.map((item) => (
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
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            {loading ? "Loading gallery items..." : "No gallery items found."}
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                aria-current={currentPage === index + 1 ? "page" : undefined}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === index + 1
                    ? "bg-stiga-orange text-white"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
