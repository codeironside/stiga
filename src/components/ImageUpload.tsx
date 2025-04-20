import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  useCallback,
} from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  maxSizeMB?: number;
  allowedTypes?: string[];
  className?: string;
}

const DEFAULT_ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
const DEFAULT_MAX_SIZE_MB = 5;

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  maxSizeMB = DEFAULT_MAX_SIZE_MB,
  allowedTypes = DEFAULT_ALLOWED_TYPES,
  className = "",
}) => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController>();
  const previousPreviewRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup object URLs and abort ongoing uploads
  useEffect(() => {
    return () => {
      if (previousPreviewRef.current) {
        URL.revokeObjectURL(previousPreviewRef.current);
      }
      abortControllerRef.current?.abort();
    };
  }, []);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!allowedTypes.includes(file.type)) {
        return `Unsupported file type. Allowed: ${allowedTypes
          .map((t) => t.replace("image/", ""))
          .join(", ")}`;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        return `File exceeds ${maxSizeMB}MB size limit`;
      }

      return null;
    },
    [allowedTypes, maxSizeMB]
  );

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];

    if (!file) {
      setPreviewImageUrl(null);
      return;
    }

    // Client-side validation
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      event.target.value = "";
      return;
    }

    // Handle preview image
    if (previousPreviewRef.current) {
      URL.revokeObjectURL(previousPreviewRef.current);
    }
    const objectUrl = URL.createObjectURL(file);
    previousPreviewRef.current = objectUrl;
    setPreviewImageUrl(objectUrl);

    // Prepare upload
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      abortControllerRef.current = new AbortController();

      const response = await fetch("http://localhost:5000/api/uploads", {
        method: "POST",
        body: formData,
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Image upload failed");
      }

      const data = await response.json();
      onImageUpload(data.imageUrl);
      setPreviewImageUrl(data.imageUrl);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.name === "AbortError" ? "Upload cancelled" : err.message);
      } else {
        setError("An unexpected error occurred");
      }
      setPreviewImageUrl(null);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validationError = validateFile(file);

      if (!validationError && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
        fileInputRef.current.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      } else if (validationError) {
        setError(validationError);
      }
    }
  };

  return (
    <div
      className={`relative w-full h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer ${className}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label
        htmlFor="image-upload-input"
        className="flex flex-col items-center justify-center w-full h-full p-4"
      >
        <div className="flex flex-col items-center justify-center text-center">
          {isLoading ? (
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          ) : previewImageUrl ? (
            <img
              src={previewImageUrl}
              alt="Upload preview"
              className="max-w-full max-h-48 object-contain rounded-lg"
            />
          ) : (
            <>
              <AiOutlineCloudUpload className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600 font-medium mb-1">
                Drag and drop or click to upload
              </p>
              <p className="text-gray-500 text-sm">
                Supported formats:{" "}
                {allowedTypes.map((t) => t.replace("image/", "")).join(", ")}
                <br />
                Max size: {maxSizeMB}MB
              </p>
            </>
          )}
        </div>
      </label>

      <input
        id="image-upload-input"
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={allowedTypes.join(",")}
        onChange={handleFileChange}
        disabled={isLoading}
      />

      {error && (
        <p className="absolute bottom-2 left-0 right-0 text-center text-red-600 text-sm">
          {error}
        </p>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
