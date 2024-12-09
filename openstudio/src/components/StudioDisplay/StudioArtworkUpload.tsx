import { useState } from "react";
import axios from "axios";

import { baseUrl } from "../../config";

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
      await axios.post(`${baseUrl}/artworks/create/`, artworkData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    <article className="article">
      <div className="columns is-centered">
        <div className="column is-6 is-full-mobile os-content-bk box py-4">
          {" "}
          <h2 className="os-subtitle-text is-size-3 has-text-centered has-text-weight-bold pb-4">
            Upload New Artwork
          </h2>
          {error && <div className="notification is-danger">{error}</div>}
          {isLoading ? (
            <div className="is-loading">Uploading artwork...</div>
          ) : (
            <ArtworkForm onSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </article>
  );
}

export default StudioArtworkUpload;
