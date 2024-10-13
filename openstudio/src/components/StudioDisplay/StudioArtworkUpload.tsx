import { useState } from "react";
import axios from "axios";
import ArtworkForm from "../UtilityComps/ArtworkForm";
import { cloudinaryUpload } from "../UtilityComps/ImageUploader";
import { ArtworkFormData } from "../../interfaces/artwork";

interface StudioArtworkUploadProps {
  onUploadSuccess: () => void;
}

function StudioArtworkUpload({ onUploadSuccess }: StudioArtworkUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    formData: ArtworkFormData,
    imageFiles: (File | null)[]
  ) => {
    setIsLoading(true);
    setError(null);

    // Filter out null values
    const validFiles = imageFiles.filter((file): file is File => file !== null);

    console.log(
      "Files to upload:",
      validFiles.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      }))
    );

    if (validFiles.length === 0) {
      setError("Please select at least one image to upload.");
      setIsLoading(false);
      return;
    }

    try {
      const imageUrls = await cloudinaryUpload(validFiles);

      console.log("Uploaded image URLs:", imageUrls);

      const artworkData = {
        ...formData,
        artworks_images: imageUrls,
      };

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/artworks/create/",
        artworkData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Artwork creation response:", response.data);

      onUploadSuccess();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Upload error:", error);
      setError(
        error.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            {" "}
            <h1 className="title">Upload New Artwork</h1>
            {error && <div className="notification is-danger">{error}</div>}
            {isLoading ? (
              <div className="is-loading">Uploading artwork...</div>
            ) : (
              <ArtworkForm onSubmit={handleSubmit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudioArtworkUpload;
