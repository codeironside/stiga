import React, { useState, ChangeEvent } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setError(null); // Clear previous errors
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setPreviewImageUrl(URL.createObjectURL(file));
        setIsLoading(true);

        const formData = new FormData();
        formData.append('image', file);

        try {
          const response = await fetch('/api/uploads', { // Changed the path here
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            onImageUpload(data.imageUrl);
            setPreviewImageUrl(data.imageUrl);
          } else {
            const errorData = await response.json();
            setError(errorData.message || 'Image upload failed.');
            setPreviewImageUrl(null);
          }
        } catch (uploadError: any) {
          console.error('Error uploading image:', uploadError);
          setError(uploadError.message || 'Error uploading image');
          setPreviewImageUrl(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setError('Please select a valid image file.');
        setPreviewImageUrl(null);
        // Reset the input
        event.target.value = '';
      }
    } else {
      setPreviewImageUrl(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {isLoading ? (
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          ) : previewImageUrl ? (
            <img
              src={previewImageUrl}
              alt="Preview"
              className="max-w-full max-h-48 rounded-lg"
            />
          ) : (
            <>
              <AiOutlineCloudUpload className="text-gray-500 w-12 h-12" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </>
          )}
        </div>
        <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
      </label>

      {error && (
        <p className="mt-2 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;